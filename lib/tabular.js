"use strict"

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
            cb(this.tabular.getCell(this.idx, j))
        }
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
            cb(this.tabular.getValue(i, this.idx))
        }
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
        this.header = header
        if (this.colCount == 0) { this.colCount = header.length }
    }
    appendRow(row) {
        if (this.colCount != 0 && row.length != this.colCount) { throw "Incorrect row size" }
        this.rows.push(row)
        this.rowCount += 1

        if (this.colCount == 0) { this.colCount = row.length }

    }
    insertRowBefore(index, row) {
        this.rows.splice(index-1, 0, row)
    }
    insertRowAfter(index, row) {
        this.rows.splice(index, 0, row)
    }
    insertColumnBefore(index, col) {
        for(let i = 0; i < this.rows.length; i++) {
            this.rows[i].splice(index-1, 0, col)
        }
    }
    insertColumnAfter(index, col) {
        for(let i = 0; i < this.rows.length; i++) {
            this.rows[i].splice(index, 0, col)
        }
    }
    getRow(idx) {
        return new Row(this, idx)
    }
    getColumn(idx) {
        return new Column(this, idx)
    }
    eachRow(cb) {
        for(let i=0; i<this.rowCount; i++) {
            cb(new Row(i))
        }
    }
    eachColumn(cb) {
        for(let i=0; i<this.colCount; i++) {
            cb(new Column(i))
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
}
exports.Tabular = Tabular
