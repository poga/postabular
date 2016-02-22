"use strict"

let expect = require('chai').expect
let fs = require("fs")
let postabular = require("../lib/index")
let stream = require("stream")

describe('postabular', () => {
    it('should do nothing if no plugin is given', (done) => {
        let ws = stream.Writable()
        let result = ""
        ws._write = function(chunk, enc, next) {
            result += chunk.toString()
            next()
        }
        ws.on("finish", () => {
            expect(result).equal("h1,h2,h3\n1,2,3\n4,5,6\n")
            done()
        })

        fs.createReadStream(`${__dirname}/test.csv`).pipe(postabular()).pipe(ws)
    })
})
