"use strict"

let postabular = require("..")
let Promise = require("bluebird")
let fs = Promise.promisifyAll(require("fs"))

module.exports = postabular.plugin('replace', function(tabular, result) {
    return new Promise(function(resolve, reject) {
        fs.readFile(`${__dirname}/../test/test.csv`, (err, content) => {
            let rows = content.toString().split("\n").map(x => x.split(','))
            result.setHeader(rows[0])
            result.appendRow(rows[1])
            result.appendRow(rows[2])
            resolve()
        })
    })
})
