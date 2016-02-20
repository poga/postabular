"use strict"

let opts = require("commander")
let fs = require("fs")
let _ = require('lodash')

let postabular = require("..")

let pkg = fs.readFileSync(`${__dirname}/../package.json`)

opts
    .version(JSON.parse(pkg).version)
    .option('-f, --force', 'Force run')
    .parse(process.argv)

if (!process.argv.slice(2).length) {
    opts.help()
}

let setFirstRowTo1 = postabular.plugin('first-row-to-1', function(tabular) {
    tabular.getRow(0).eachCell((x) => { x.value = 1 })
})

let setSecondRowTo2 = postabular.plugin('second-row-to-2', function(tabular) {
    tabular.getRow(1).eachCell((x) => { x.value = 2 })
})

let logFirstRow = postabular.plugin('log-first-row', function(tabular) {
    tabular.getRow(0).eachCell((x) => {console.log(x.value)})
})

fs.createReadStream(opts.args[0]).pipe(postabular({}, [setFirstRowTo1, setSecondRowTo2, logFirstRow])).pipe(fs.createWriteStream(opts.args[1]))

// desired API:
//
// postabular = require("postabular")("meta fn")
//
// fs.createReadStream.pipe(postabular([require('tai-convert'), require('taiwan-city-id')(only: '縣市鄉鎮')]))
