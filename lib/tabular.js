"use strict"

let _ = require('lodash')
let chalk = require("chalk")
let Table = require('tty-table')

class Row {
    constructor(tabular, idx) {
        this.tabular = tabular
        this.idx = idx
    }
    insertRowBefore(row) {
        this.tabular.insertRowBefore(this.idx, row)
    }
    insertRowAfter(row) {
        this.tabular.insertRowAfter(this.idx, row)
    }
    eachCell(cb) {
        for(let j=0; j<this.tabular.colCount;j++) {
            cb(this.tabular.getCell(this.idx, j), j)
        }
    }
    getCell(idx) {
        return this.tabular.getCell(this.idx, idx)
    }
    get length() {
        return this.tabular.size().col
    }
}
exports.Row = Row

class Column {
    constructor(tabular, idx) {
        this.tabular = tabular
        this.idx = idx
    }
    insertColumnBefore(col) {
        this.tabular.insertColumnBefore(this.idx, col)
    }
    insertColumnAfter(col) {
        this.tabular.insertColumnAfter(this.idx, col)
    }
    eachCell(cb) {
        for(let i=0; i<this.tabular.rowCount;i++) {
            cb(this.tabular.getCell(i, this.idx), i)
        }
    }
    getCell(idx) {
        return this.tabular.getCell(idx, this.idx)
    }
    header() {
        return this.tabular.getHeader(this.idx)
    }
    get length() {
        return this.tabular.size().row
    }
}
exports.Column = Column

class Cell {
    constructor(tabular, value) {
        this.tabular = tabular
        this.value = value
    }
}
exports.Cell = Cell

class Tabular {
    constructor() {
        this.rows = []
        this.header = null
        this.rowCount = 0
        this.colCount = 0
    }
    setHeader(header) {
        this.header = header
    }
    size() {
        return {row: this.rowCount, col: this.colCount}
    }
    setHeader(header) {
        if (this.colCount != 0 && this.colCount != header.length) { throw "Incorrect header size" }
        this.header = header.map(x => { return new Cell(this, x) })
        this._updateSize()
    }
    getHeader(idx) {
        return this.header[idx]
    }
    appendRow(row) {
        if (this.colCount != 0 && row.length != this.colCount) { throw "Incorrect row size" }
        this.rows.push(row.map(x => { return new Cell(this, x) }))
        this._updateSize()
    }
    insertRowBefore(index, row) {
        if (this.colCount != 0 && row.length != this.colCount) { throw "Incorrect row size" }
        this.rows.splice(index-1, 0, row.map(x => { return new Cell(this, x) }))
        this._updateSize()
        return this.rows
    }
    insertRowAfter(index, row) {
        if (this.colCount != 0 && row.length != this.colCount) { throw "Incorrect row size" }
        this.rows.splice(index, 0, row.map(x => {return new Cell(this, x)}))
        this._updateSize()
        return this.rows
    }
    insertColumnBefore(index, col) {
        if (this.rowCount != 0 && col.length != this.rowCount) { throw "Incorrect column size" }
        for(let i = 0; i < col.length; i++) {
            if (_.isUndefined(this.rows[i])) { this.rows[i] = [] }
        }
        for(let i = 0; i < this.rows.length; i++) {
            this.rows[i].splice(index-1, 0, new Cell(this, col[i]))
        }
        this._updateSize()
    }
    insertColumnAfter(index, col) {
        if (this.rowCount != 0 && col.length != this.rowCount) { throw "Incorrect column size" }
        for(let i = 0; i < col.length; i++) {
            if (_.isUndefined(this.rows[i])) { this.rows[i] = [] }
        }
        for(let i = 0; i < this.rows.length; i++) {
            this.rows[i].splice(index, 0, new Cell(this, col[i]))
        }
        this._updateSize()
    }
    getRow(idx) {
        if (idx < 0 || idx > this.size().row) { throw "Row index out of bound: " + idx }
        return new Row(this, idx)
    }
    getColumn(idx) {
        if (idx < 0 || idx > this.size().col) { throw "Column index out of bound: " + idx }
        return new Column(this, idx)
    }
    eachRow(cb) {
        for(let i=0; i<this.rowCount; i++) {
            cb(new Row(this, i), i)
        }
    }
    eachColumn(cb) {
        for(let i=0; i<this.colCount; i++) {
            cb(new Column(this, i), i)
        }
    }
    eachCell(cb) {
        for(let i=0; i<this.rowCount; i++) {
            for(let j=0; j<this.colCount; j++) {
                cb(this.rows[i][j])
            }
        }
    }
    getCell(rowIdx, colIdx) {
        return this.rows[rowIdx][colIdx]
    }
    _updateSize() {
        this.rowCount = this.rows.length
        if (!_.isUndefined(this.rows[0])) {
            this.colCount = this.rows[0].length
        }
    }
    replace(newTabular) {
        this.rows = newTabular.rows
        this.header = newTabular.header
        this.rowCount = newTabular.rowCount
        this.colCount = newTabular.colCount
    }

    error(errRowIdx, errColIdx, message) {
        // TODO: translation between array index and csv row/column index
        console.log(chalk.red(`[EROR] Cell (${errRowIdx}, ${errColIdx}): `), message)
        let header = []
        header.push({value: this.header[errColIdx-1].value})
        header.push({value: this.header[errColIdx].value, formatter: (value) => {return chalk.bgRed(value)}})
        header.push({value: this.header[errColIdx+1].value})
        let rows = [[], [], []]
        rows[0].push(this.getRow(errRowIdx-1).getCell(errColIdx-1).value)
        rows[0].push(this.getRow(errRowIdx-1).getCell(errColIdx).value)
        rows[0].push(this.getRow(errRowIdx-1).getCell(errColIdx+1).value)
        rows[1].push(this.getRow(errRowIdx).getCell(errColIdx-1).value)
        rows[1].push(this.getRow(errRowIdx).getCell(errColIdx).value)
        rows[1].push(this.getRow(errRowIdx).getCell(errColIdx+1).value)
        rows[2].push(this.getRow(errRowIdx+1).getCell(errColIdx-1).value)
        rows[2].push(this.getRow(errRowIdx+1).getCell(errColIdx).value)
        rows[2].push(this.getRow(errRowIdx+1).getCell(errColIdx+1).value)
        console.log(Table(header, rows).render())
    }
    warn(rowIdx, colIdx, message) {
        console.log(chalk.yellow(`[WARN] Cell (${rowIdx},${colIdx}) : ${message}`))
    }
}
exports.Tabular = Tabular
