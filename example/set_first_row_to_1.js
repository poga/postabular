"use strict"

let postabular = require("..")

module.exports = postabular.plugin('first-row-to-1', function(tabular) {
    tabular.getRow(0).eachCell((x) => { x.value = 1 })
})
