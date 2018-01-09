export function create2dArray(rows,columns) {
  let array = [];
  for (let i=0; i<rows; i++) {
    array.push([]);
    for(let j=0; j<columns; j++) {
      array[i].push(0);
    }
  }
  return array;
}

export class Board {
  constructor(array) {
    this.array = array;

    this.quadrant1 = [];
    this.quadrant2 = [];
    this.quadrant3 = [];
    this.quadrant4 = [];
  }

  printResults() {
    $("#output").append("<li>" + this.array + "<li>");
  }

  insertItem(row,column,item) {
    this.array[row].splice(column,1,item);
  }


  findQuadrant(row,column) {
    if(row < 2 && column < 2) {
      return this.quadrant1;
    } else if (column > 1 && row < 2) {
      return this.quadrant2;
    } else if (row > 1 && column < 2) {
      return this.quadrant3;
    } else {
      return this.quadrant4;
    }
  }

  generateQuadrants() {
    this.quadrant1 = [];
    this.quadrant2 = [];
    this.quadrant3 = [];
    this.quadrant4 = [];

    for (let i=0; i<4; i++) {
      for(let j=0; j<4; j++) {
        this.findQuadrant(i,j).push(this.array[i][j]);
      }
    }
  }

  isLegal(row,column,item) {
    this.generateQuadrants();
    if(this.findQuadrant(row,column).includes(item)) {
      return false;
    }
    for(let i=0;i<4;i++) {
      if(this.array[row][i] === item || this.array[i][column] === item) {
        return false;
      }
    }
    return true;
  }

  isComplete() {
    for(let i=0;i<4;i++) {
      if(this.array[i].includes(0)) {
        return false;
      }
    }
    return true;
  }

  mirrorArray() {
    let mirrorArray = this.array.map(function(row) {
      return row.map(function(number) {
        return(number != 0);
      });
    });
    return mirrorArray;
  }

  solvePuzzle() {
    debugger;
    let isFixed = this.mirrorArray();
    let recursiveSolver = (number, row, column) => {
      let num = number;
      let r = row;
      let col = column;

      let backtrack = () => {
        if(r < 0 || num < 0) {
          return this.array;
        } else if (r > 0) {
          r--;
        } else {
          num--;
          r = 3;
        }
        let index = this.array[r].indexOf(num);
        if(!isFixed[r][index]) {
          this.insertItem(r,index,0);
        } else {
          backtrack();
        }
        if(index < 3) {
          col = index + 1;
        } else {
          backtrack();
        }
      };
      if(this.isComplete()) {
        return this.array;
      } else {
        if(this.array[r].includes(num)) {
          if(r<3) {
            r++;
            col = 0;
          } else {
            num++;
            r = 0;
            col = 0;
          }
        } else if(this.array[r][col] === 0 && this.isLegal(r,col,num)) {
          this.insertItem(r,col,num);
          if(r<3) {
            r++;
            col = 0;
          } else {
            num++;
            r = 0;
            col = 0;
          }
        } else if (col < 3){
          col++;
        } else if (col > 3 || r > 3 || num > 4) {
          return this.array;
        } else {
          backtrack();
        }
        recursiveSolver(num,r,col);
      }
    }
    console.log(recursiveSolver(1,0,0));
    return recursiveSolver(1,0,0);
  }
}

$(document).ready(function(){
  let unsolved = new Board([[0,4,0,0],[1,0,0,0],[0,0,0,2],[0,1,3,0]]);
  unsolved.solvePuzzle();
});
