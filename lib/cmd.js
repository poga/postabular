"use strict"

let path = require("path")
let opts = require("commander")
let fs = require("fs")
let _ = require('lodash')

let postabular = require("..")

let pkg = fs.readFileSync(`${__dirname}/../package.json`)

let list = function(val) { return val.split(',') }

opts
    .version(JSON.parse(pkg).version)
    .option('-u, --use <plugins>', 'use plugins', list)
    .option('-c, --config <config>', 'use config')
    .parse(process.argv)

if (!process.argv.slice(2).length) {
    opts.help()
}

fs.createReadStream(opts.args[0])
    .pipe(postabular(opts.use.map((plugin) => { return require(path.join(process.cwd(), plugin)) })))
    .pipe(fs.createWriteStream(opts.args[1]))
