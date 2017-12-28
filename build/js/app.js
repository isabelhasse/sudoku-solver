(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Player(totalScore, runningScore) {
  this.totalScore = totalScore;
  this.runningScore = runningScore;
}

function Game() {
  this.whoseTurn = 1;
  this.roll = 0;
}

var resetValues = function() {
  player1.totalScore = 0;
  player2.totalScore = 0;
}

var rollDice = function() {
  return Math.floor((Math.random() * 6) + 1);
}

var nextPlayer = function(game) {
  if (game.whoseTurn === 1) {
    game.whoseTurn = 2;
  } else {
    game.whoseTurn = 1;
  }
};

Player.prototype.processRoll = function(game) {
  roll = rollDice()
  if (roll === 1) {
    nextPlayer(game);
    this.runningScore = 0;
  } else {
    this.runningScore += roll;
  }
}

Player.prototype.hold = function(game) {
  this.totalScore += this.runningScore;
  if (this.totalScore >= 100) {
    alert("You are the winner!!!!");
    resetValues();
  }
  this.runningScore = 0;
  nextPlayer(game);
}

exports.playerModule = Player;
exports.gameModule = Game;

},{}],2:[function(require,module,exports){
var Player = require('./../js/pig-dice.js').playerModule;
var Game = require('./../js/pig-dice.js').gameModule;

$(document).ready(function(){
  var player1 = new Player(0, 0, 0);
  var player2 = new Player(0, 0, 0);

  var game = new Game();

  $("#total1").text(player1.totalScore);
  $("#total2").text(player2.totalScore);

  var displayTurn = function() {
    $("#player1").slideToggle();
    $("#player2").slideToggle();
  };

  var rollButton = function() {
    if(game.whoseTurn === 1) {
      player1.processRoll(game);
      $("#running-score").text(player1.runningScore);
    } else {
      player2.processRoll(game);
      $("#running-score").text(player2.runningScore);
    }
    if(roll === 1) {
      displayTurn();
    }
    $("#roll-result").text(roll);
  }

  var holdButton = function() {
    if(game.whoseTurn === 1) {
      player1.hold(game);
    } else {
      player2.hold(game);
    }
    $("#total1").text(player1.totalScore);
    $("#total2").text(player2.totalScore);
    displayTurn();
  }

  $("#roll-dice").click(function() {
    rollButton();
  });

  $("#hold").click(function() {
    holdButton();
  });

  $("#computer-turn").click(function() {
    rollButton();
    if (roll != 1) {
      rollButton();
    }
    if (roll != 1) {
      holdButton();
    }
  })
});

},{"./../js/pig-dice.js":1}]},{},[2]);
