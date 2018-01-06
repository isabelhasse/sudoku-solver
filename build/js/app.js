(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.create2dArray = create2dArray;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function create2dArray(rows, columns) {
  var array = [];
  for (var i = 0; i < rows; i++) {
    array.push([]);
    for (var j = 0; j < columns; j++) {
      array[i].push(0);
    }
  }
  return array;
}

var Board = exports.Board = function () {
  function Board(array) {
    _classCallCheck(this, Board);

    this.array = array;

    this.quadrant1 = [];
    this.quadrant2 = [];
    this.quadrant3 = [];
    this.quadrant4 = [];
  }

  _createClass(Board, [{
    key: "insertItem",
    value: function insertItem(row, column, item) {
      this.array[row].splice(column, 1, item);
    }
  }, {
    key: "findQuadrant",
    value: function findQuadrant(row, column) {
      if (row < 2 && column < 2) {
        return this.quadrant1;
      } else if (column > 1 && row < 2) {
        return this.quadrant2;
      } else if (row > 1 && column < 2) {
        return this.quadrant3;
      } else {
        return this.quadrant4;
      }
    }
  }, {
    key: "generateQuadrants",
    value: function generateQuadrants() {
      this.quadrant1 = [];
      this.quadrant2 = [];
      this.quadrant3 = [];
      this.quadrant4 = [];

      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          this.findQuadrant(i, j).push(this.array[i][j]);
        }
      }
    }
  }, {
    key: "isLegal",
    value: function isLegal(row, column, item) {
      this.generateQuadrants();
      if (this.findQuadrant(row, column).includes(item)) {
        return false;
      }
      for (var i = 0; i < 4; i++) {
        if (this.array[row][i] === item || this.array[i][column] === item) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "isComplete",
    value: function isComplete() {
      for (var i = 0; i < 4; i++) {
        if (this.array[i].includes(0)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "solvePuzzle",
    value: function solvePuzzle(number, row, column) {
      var num = number;
      var r = row;
      var col = column;
      if (this.isComplete()) {
        return this.array;
      } else {
        if (this.array[r].includes(num)) {
          if (r < 3) {
            r++;
            col = 0;
          } else {
            num++;
            r = 0;
            col = 0;
          }
        } else if (this.array[r][col] === 0 && this.isLegal(r, col, num)) {
          this.insertItem(r, col, num);
          console.log(this.array);
          if (r < 3) {
            r++;
            col = 0;
          } else {
            num++;
            r = 0;
            col = 0;
          }
        } else if (col < 3) {
          col++;
        } else if (r > 0) {
          r--;
          var index = this.array[r].indexOf(num);
          this.insertItem(r, index, 0);
          col = index + 1;
        } else {
          num--;
          r = 3;
          var _index = this.array[r].indexOf(num);
          this.insertItem(r, _index, 0);
          col = _index + 1;
        }
        this.solvePuzzle(num, r, col);
      }
    }
  }]);

  return Board;
}();

},{}],2:[function(require,module,exports){
'use strict';

var _sudoku = require('./../js/sudoku.js');

$(document).ready(function () {
  var unsolved = new _sudoku.Board([[0, 3, 0, 0], [2, 0, 0, 3], [1, 0, 0, 4], [0, 0, 1, 0]]);
  unsolved.solvePuzzle(1, 0, 0);
});

},{"./../js/sudoku.js":1}]},{},[2]);
