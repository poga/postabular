"use strict"

let expect = require('chai').expect
let fs = require("fs")
let postabular = require("../lib/index")
let stream = require("stream")

describe('postabular', () => {
    let ws = null
    let result = ""
    beforeEach(() => {
        result = ""
        ws = stream.Writable()
        ws._write = function(chunk, enc, next) {
            result += chunk.toString()
            next()
        }
    })

    it('should do nothing if no plugin is given', (done) => {
        ws.on("finish", () => {
            expect(result).equal("h1,h2,h3\n1,2,3\n4,5,6\n")
            done()
        })

        fs.createReadStream(`${__dirname}/test.csv`).pipe(postabular()).pipe(ws)
    })

    it('should allow plugins to modify origin tabular data', (done) => {
        ws.on("finish", () => {
            expect(result).equal("h1,h2,h3\n1,1,1\n4,5,6\n")
            done()
        })
        fs.createReadStream(`${__dirname}/test.csv`).pipe(postabular([require("../example/set_first_row_to_1")])).pipe(ws)
    })

    it('should allow plugins to return a new tabular data', (done) => {
        ws.on("finish", () => {
            expect(result).equal("a,b,c\n1,2,3\n")
            done()
        })
        fs.createReadStream(`${__dirname}/test.csv`).pipe(postabular([require("../example/replace")])).pipe(ws)
    })

    it('should allow async plugin via returning promise', (done) => {
        ws.on("finish", () => {
            expect(result).equal("h1,h2,h3\n1,2,3\n4,5,6\n")
            done()
        })
        fs.createReadStream(`${__dirname}/test.csv`).pipe(postabular([require("../example/promise")])).pipe(ws)
    })

    it('should allow multiple async plugin chaining together via returning promise', (done) => {
        ws.on("finish", () => {
            expect(result).equal("h1,h2,h3\n1,1,1\n4,5,6\n")
            done()
        })
        fs.createReadStream(`${__dirname}/test.csv`).pipe(postabular([require("../example/promise"), require("../example/promise2")])).pipe(ws)
    })

    it('should allow mixing sync and async plugin chaining together', (done) => {
        ws.on("finish", () => {
            expect(result).equal("h1,h2,h3\n1,1,1\n4,5,6\n")
            done()
        })
        fs.createReadStream(`${__dirname}/test.csv`).pipe(postabular([require("../example/promise"), require("../example/set_first_row_to_1")])).pipe(ws)
    })
})
