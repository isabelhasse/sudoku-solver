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
    key: "printResults",
    value: function printResults() {
      $("#output").append("<li>" + this.array + "<li>");
    }
  }, {
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
    key: "mirrorArray",
    value: function mirrorArray() {
      var mirrorArray = this.array.map(function (row) {
        return row.map(function (number) {
          return number != 0;
        });
      });
      return mirrorArray;
    }
  }, {
    key: "solvePuzzle",
    value: function solvePuzzle() {
      var _this = this;

      debugger;
      var isFixed = this.mirrorArray();
      var recursiveSolver = function recursiveSolver(number, row, column) {
        var num = number;
        var r = row;
        var col = column;

        var backtrack = function backtrack() {
          if (r < 0 || num < 0) {
            return _this.array;
          } else if (r > 0) {
            r--;
          } else {
            num--;
            r = 3;
          }
          var index = _this.array[r].indexOf(num);
          if (!isFixed[r][index]) {
            _this.insertItem(r, index, 0);
          } else {
            backtrack();
          }
          if (index < 3) {
            col = index + 1;
          } else {
            backtrack();
          }
        };
        if (_this.isComplete()) {
          return _this.array;
        } else {
          if (_this.array[r].includes(num)) {
            if (r < 3) {
              r++;
              col = 0;
            } else {
              num++;
              r = 0;
              col = 0;
            }
          } else if (_this.array[r][col] === 0 && _this.isLegal(r, col, num)) {
            _this.insertItem(r, col, num);
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
          } else if (col > 3 || r > 3 || num > 4) {
            return _this.array;
          } else {
            backtrack();
          }
          recursiveSolver(num, r, col);
        }
      };
      console.log(recursiveSolver(1, 0, 0));
      return recursiveSolver(1, 0, 0);
    }
  }]);

  return Board;
}();

$(document).ready(function () {
  var unsolved = new Board([[0, 4, 0, 0], [1, 0, 0, 0], [0, 0, 0, 2], [0, 1, 3, 0]]);
  unsolved.solvePuzzle();
});

},{}]},{},[1]);
