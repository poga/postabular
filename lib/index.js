// sample postprocessor: 拆解地址成多個欄位
// geocoding
// 臺台轉換
// 縣市編碼轉換
// super powered CSV: fomulars
"use strict"

let parse = require('csv-parse')
let stringify = require("csv-stringify")
let _ = require('lodash')
let fs = require('fs')
let miss = require("mississippi")

let tabular = require("./tabular")
let Tabular = tabular.Tabular
let Cell = tabular.Cell

let postabular = function(plugins, parseOptions) {
    let tabular = new Tabular()
    let isFirstRow = true

    let stringifier = stringify()

    let parser = parse(_.merge({auto_parse: true, auto_parse_date: true}, parseOptions))
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
            let newResult = new Tabular()
            // TODO: support async plugin
            plugin.process(tabular, newResult)
            if (newResult.rows.length != 0 || newResult.header != null) {
                tabular.replace(newResult)
            }
        })
        stringifier.write(tabular.header.map(x => x.value))
        _.forEach(tabular.rows, (r) => {
            stringifier.write(r.map(x => x.value))
        })
    })

    return miss.duplex(parser, stringifier)
}

postabular.plugin = function(name, processor) {
    let plugin = {name: name,
        process: processor
    }

    return plugin
}

module.exports = postabular
