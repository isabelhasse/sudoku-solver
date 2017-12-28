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
