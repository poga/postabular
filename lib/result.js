"use strict"

let tabular = require("./tabular")
let Tabular = tabular.Tabular

function isPromise(obj) {
    return typeof obj === 'object' && typeof obj.then === 'function';
}

function result(processor, tabular) {
    let newResult = new Tabular()
    return new Promise(function(resolve, reject) {
        let result = processor.process(tabular, newResult)
        if (isPromise(result)) {
            result.then(() => {
                if (newResult.rows.length != 0 || newResult.header != null) {
                    tabular.replace(newResult)
                }
                resolve()
            })
        } else {
            if (newResult.rows.length != 0 || newResult.header != null) {
                tabular.replace(newResult)
            }
            resolve()
        }
    })
}
module.exports = result
