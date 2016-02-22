"use strict"

let postabular = require("..")

module.exports = postabular.plugin('replace', function(tabular, result) {
    result.setHeader(['a','b','c'])
    result.appendRow([1,2,3])
})
