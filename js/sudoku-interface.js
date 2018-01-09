import {Board, create2dArray} from './../js/sudoku.js';

$(document).ready(function(){
  let unsolved = new Board([[0,4,0,0],[1,0,0,0],[0,0,0,2],[0,1,3,0]]);
  unsolved.solvePuzzle();
});
