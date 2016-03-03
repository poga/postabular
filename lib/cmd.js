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
    .option('-u, --use <plugins>', 'use plugins', list, [])
    .option('-l, --local <plugins>', 'use local plugins', list, [])
    .option('-w, --watch', 'watch input file change')
    .option('-o, --output <filename>', 'output file name')
    .parse(process.argv)

if (!process.argv.slice(2).length) {
    opts.help()
}

let plugins = []
plugins = plugins.concat(opts.use.map(plugin => { return require(plugin) }))
plugins = plugins.concat(opts.local.map(plugin => { return require(path.join(process.cwd(), plugin)) }))

let os = undefined
if (opts.watch) {
    if (_.isUndefined(opts.args[0])) { throw "Must give input file name if --watch is set" }

    fs.watchFile(opts.args[0], function(newFile) {
        os = fs.createReadStream(opts.args[0]).pipe(postabular(plugins))

        if (opts.output) {
            os.pipe(fs.createWriteStream(opts.output))
        } else {
            os.pipe(process.stdout)
        }
    })
}

if (opts.args[0]) {
    os = fs.createReadStream(opts.args[0]).pipe(postabular(plugins))
} else {
    os = process.stdin.pipe(postabular(plugins))
}

if (opts.output) {
    os.pipe(fs.createWriteStream(opts.output))
} else {
    os.pipe(process.stdout)
}
