"use strict"

let postabular = require("..")
let Promise = require("bluebird")

module.exports = postabular.plugin('set-first-row-to-1-async', function(tabular, result) {
    return new Promise(function(resolve, reject) {
        tabular.getRow(0).eachCell((cell) => {cell.value = 1})
        resolve()
    })
})
