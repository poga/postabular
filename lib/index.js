// sample postprocessor: 拆解地址成多個欄位
// geocoding
// 臺台轉換
// 縣市編碼轉換
// super powered CSV: fomulars
"use strict"

let parse = require('csv-parse')
let _ = require('lodash')
let fs = require('fs')

let tabular = require("./tabular")
let Tabular = tabular.Tabular
let Cell = tabular.Cell

let postabular = function(options, plugins) {
    let tabular = new Tabular()
    let parser = parse(_.merge({auto_parse: true, auto_parse_date: true}, options))
    let isFirstRow = true

    parser.on('readable', () => {
        let row = null
        while(row = parser.read()) {
            if (isFirstRow) {
                tabular.header = row.map((x) => { return new Cell(tabular, x) })
                isFirstRow = false
            } else {
                tabular.appendRow(row.map((x) => { return new Cell(tabular, x) }))
            }
        }
    })
    parser.on('error', (err) => { throw err })
    parser.on('finish', () => {
        _.forEach(plugins, (plugin) => {
            plugin.process(tabular)
        })
    })

    return parser
}

postabular.plugin = function(name, processor) {
    let plugin = {name: name,
        process: processor
    }

    return plugin
}

module.exports = postabular
