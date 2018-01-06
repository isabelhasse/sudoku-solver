import {Board, create2dArray} from './../js/sudoku.js';

describe("board", function() {
  let fourByFour = new Board(create2dArray(4,4))

  it("allows insertion of an item in a 2d array at a given coordinate", function() {
    let twoByTwo = new Board(create2dArray(2,2));
    twoByTwo.insertItem(1,1,1);
    expect(twoByTwo.array).toEqual([[0,0],[0,1]])
  });

  it("checks to see if a move is legal", function() {
    fourByFour.insertItem(1,1,1);

    expect(fourByFour.isLegal(1,3,1)).toBe(false);
    expect(fourByFour.isLegal(2,2,1)).toBe(true);
  });

  it("also accounts for quadrants", function() {
    fourByFour.insertItem(1,1,1);
    expect(fourByFour.isLegal(0,0,1)).toBe(false);
  });

  it("fills in a 4 by 4 board where no backtracking is required", function() {
    let unsolved = new Board([[0,3,0,0],[2,0,0,3],[1,0,0,4],[0,0,1,0]]);

    expect(unsolved.solvePuzzle(1,0,0)).toEqual([[4,3,2,1],[2,1,4,3],[1,2,3,4],[3,4,1,2]]);
  })

  it("fills in a 4 by 4 board with backtracking", function() {
    let unsolved2 = new Board([[3,0,0,0],[0,1,4,0],[0,3,2,0],[0,0,0,4]]);

    console.log(unsolved2.solvePuzzle(1,0,0));

    expect(unsolved2.solvePuzzle(1,0,0)).toEqual([[3,4,1,2],[2,1,4,3],[4,3,2,1],[1,2,3,4]]);
  })
});
