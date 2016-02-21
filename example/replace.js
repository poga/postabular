"use strict"

let postabular = require("..")

module.exports = postabular.plugin('first-row-to-1', function(tabular, result) {
    result.setHeader(['a','b','c'])
    result.appendRow([1,2,3])
})
