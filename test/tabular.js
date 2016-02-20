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
        })
        it('should throw exception if row doesn\'t have same size', () => {
            t.insertRowAfter(0, [1,2,3])

            expect(function() {
                t.insertRowAfter(0, [1,2])
            }).to.throw("Incorrect row size")
        })
    })
    describe('#insertRowBefore()', () => {
        it('should append new row and update tabular size', () => {
            t.insertRowBefore(0,[1,2,3])

            expect(t.rows).have.length(1)
            expect(t.size()).deep.equal({row: 1, col: 3})
        })
        it('should throw exception if row doesn\'t have same size', () => {
            t.insertRowBefore(0, [1,2,3])

            expect(function() {
                t.insertRowBefore(0, [1,2])
            }).to.throw("Incorrect row size")
        })
    })
})
