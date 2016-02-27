"use strict"

let expect = require('chai').expect
let Tabular = require("../lib/tabular").Tabular

describe('Tabular', () => {
    let t = null
    beforeEach(() => {
        t = new Tabular()
    })

    describe('#constructor()', () => {
        it('should initialize everything properly', () => {
            expect(t.rows).have.length(0)
            expect(t.header).equal(null)
            expect(t.rowCount).equal(0)
            expect(t.colCount).equal(0)
            expect(t.size()).deep.equal({row: 0, col: 0})
        })
    })
    describe('#appendRow()', () => {
        it('should append new row and update tabular size', () => {
            t.appendRow([1,2,3])

            expect(t.rows).have.length(1)
            expect(t.size()).deep.equal({row: 1, col: 3})
        })
        it('should throw exception if row doesn\'t have same size', () => {
            t.appendRow([1,2,3])

            expect(function() {
                t.appendRow([1,2])
            }).to.throw("Incorrect row size")
        })
    })
    describe('#insertRowAfter()', () => {
        it('should append new row and update tabular size', () => {
            t.insertRowAfter(0,[1,2,3])

            expect(t.rows).have.length(1)
            expect(t.size()).deep.equal({row: 1, col: 3})

            t.insertRowAfter(0,[4,5,6])

            expect(t.rows).have.length(2)
            expect(t.size()).deep.equal({row: 2, col: 3})
        })
        it('should throw exception if row doesn\'t have same size', () => {
            t.insertRowAfter(0, [1,2,3])

            expect(function() {
                t.insertRowAfter(0, [1,2])
            }).to.throw("Incorrect row size")
        })
    })
    describe('#insertRowBefore()', () => {
        it('should insert new row and update tabular size', () => {
            t.insertRowBefore(0,[1,2,3])

            expect(t.rows).have.length(1)
            expect(t.size()).deep.equal({row: 1, col: 3})

            t.insertRowBefore(0,[4,5,6])

            expect(t.rows).have.length(2)
            expect(t.size()).deep.equal({row: 2, col: 3})
        })
        it('should throw exception if row doesn\'t have same size', () => {
            t.insertRowBefore(0, [1,2,3])

            expect(function() {
                t.insertRowBefore(0, [1,2])
            }).to.throw("Incorrect row size")
        })
    })
    describe('#insertColumnBefore()', () => {
        it('should insert new column and update tabular size', () => {
            t.insertColumnBefore(0,[1,2,3])

            expect(t.rows).have.length(3)
            expect(t.size()).deep.equal({row: 3, col: 1})

            t.insertColumnBefore(0,[4,5,6])

            expect(t.rows).have.length(3)
            expect(t.size()).deep.equal({row: 3, col: 2})
        })
        it('should throw exception if row doesn\'t have same size', () => {
            t.insertColumnBefore(0, [1,2,3])

            expect(function() {
                t.insertColumnBefore(0, [1,2])
            }).to.throw("Incorrect column size")
        })
    })
    describe('#insertColumnAfter()', () => {
        it('should insert new column and update tabular size', () => {
            t.insertColumnAfter(0,[1,2,3])

            expect(t.rows).have.length(3)
            expect(t.size()).deep.equal({row: 3, col: 1})

            t.insertColumnAfter(0,[4,5,6])

            expect(t.rows).have.length(3)
            expect(t.size()).deep.equal({row: 3, col: 2})
        })
        it('should throw exception if row doesn\'t have same size', () => {
            t.insertColumnAfter(0, [1,2,3])

            expect(function() {
                t.insertColumnAfter(0, [1,2])
            }).to.throw("Incorrect column size")
        })
    })
    describe('#eachRow()', () => {
        it('should return each row and its index', () => {
            t.appendRow([1,2,3])
            t.appendRow([4,5,6])

            t.eachRow((row, i) => {
                if (i == 0) {
                    expect(row.getCell(0).value).equal(1)
                    expect(row.getCell(1).value).equal(2)
                    expect(row.getCell(2).value).equal(3)
                }
                if (i == 1) {
                    expect(row.getCell(0).value).equal(4)
                    expect(row.getCell(1).value).equal(5)
                    expect(row.getCell(2).value).equal(6)
                }
            })
        })
    })
    describe('#eachColumn()', () => {
        it('should return each row and its index', () => {
            t.appendRow([1,2,3])
            t.appendRow([4,5,6])

            t.eachColumn((col, i) => {
                if (i == 0) {
                    expect(col.getCell(0).value).equal(1)
                    expect(col.getCell(1).value).equal(4)
                }
                if (i == 1) {
                    expect(col.getCell(0).value).equal(2)
                    expect(col.getCell(1).value).equal(5)
                }
                if (i == 2) {
                    expect(col.getCell(0).value).equal(3)
                    expect(col.getCell(1).value).equal(6)
                }
            })
        })
    })
    describe('#getRow()', () => {
        it('should throw exception if index is out of bound', () => {
            expect(function() {
                t.getRow(-1)
            }).to.throw("Row index out of bound: -1")
        })
    })
    describe('#getColumn()', () => {
        it('should throw exception if index is out of bound', () => {
            expect(function() {
                t.getColumn(-1)
            }).to.throw("Column index out of bound: -1")
        })
    })
})
