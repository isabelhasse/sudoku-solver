import {Board, create2dArray} from './../js/sudoku.js';

$(document).ready(function(){
  let unsolved = new Board([[0,3,0,0],[2,0,0,3],[1,0,0,4],[0,0,1,0]]);  
  unsolved.solvePuzzle(1,0,0);
});
