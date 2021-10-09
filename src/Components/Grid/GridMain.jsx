import React, { Component } from "react";
import Square from "../Mine-Square/Square";
import "./style.css";

class GridMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: this.props.data,
      noOfMines: this.props.minesCount,
      totalCount: this.props.data.length * this.props.data.length,
      noOfLands: 0,
      SquareArray: {},
    };
  }

  mineReaction() {
    setTimeout(function () {
      alert("Lose you clikced a mine");
    }, 5);
    window.location.reload();
  }

  revealForEmpty = (x, y) => {
    let l = this.props.data.length;
    for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        var i = x + xoff;
        var j = y + yoff;
        if (i > -1 && i < l && j > -1 && j < l) {
          let obj = this.state.SquareArray[i + "," + j];
          if (
            !obj.state.revealed &&
            obj.state.minesNear === 0 &&
            i + "," + j !== x + "," + y
          ) {
            if (!obj.state.notFlaged) {
              console.log("yes.. flaged");
            } else {
              obj.revealLand();
              this.setReveal(i, j, true);
              this.revealForEmpty(i, j);
            }
          } else {
            if (!obj.state.notFlaged) {
              console.log("yes.. flaged");
            } else {
              obj.revealLand();
              this.setReveal(i, j, true);
            }
          }
        }
      }
    }

    this.gameWin();
  };

  notAMineReaction = (x, y, type) => {
    if (type === 0) {
      let obj = this.state.SquareArray[x + "," + y];
      if (!obj.state.revealed) {
        if (!obj.state.notFlaged) {
          console.log("yes.. flaged");
        } else {
          obj.revealLand();
          this.setReveal(x, y, true);
          this.revealForEmpty(x, y);
        }
      }
    } else if (type === 1) {
      let obj = this.state.SquareArray[x + "," + y];
      if (!obj.state.revealed) {
        if (!obj.state.notFlaged) {
          console.log("yes.. flaged");
        } else {
          obj.revealLand();
          this.setReveal(x, y, true);
        }
      }
    }
    this.gameWin();
  };

  gameWin = () => {
    if (this.noOfRevealed() + this.state.noOfMines === this.state.totalCount) {
      this.props.winGame();
    }
  };

  gameLose = () => {
    console.log(`Lost the game`);

    this.revealingAllMines();
    this.mineReaction();
  };

  revealingAllMines = () => {
    let grid = this.props.data;
    let l = grid.length;
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l; j++) {
        let cell = this.state.SquareArray[i + "," + j];
        if (cell.state.isBomb) {
          console.log(`Bomb at ${i + "," + j} `);
          cell.revealLand();
        }
      }
    }
  };

  revealingWithFlag = (x, y) => {
    let data = this.cellDetails(x, y);
    let cell = this.state.SquareArray[x + "," + y];
    let minesCount = cell.state.minesNear;
    if (data.flag === minesCount && data.bomb === 0) {
      console.log("Case 1: Yes Proceed Eeshi Poshii");
      cell.revealLand();
      this.setReveal(x, y, true);
      this.revealForEmpty(x, y);
    } else if (data.flag >= minesCount && data.bomb !== 0) {
      // console.log(`Case 2: You Lose..`);
      this.gameLose();
      console.log(data);
    } else if (data.flag < minesCount) {
      console.log(`Case 3: some more flags needed`);
      console.log(data);
    }
  };

  cellDetails = (x, y) => {
    let grid = this.props.data;
    let l = grid.length;
    let bomb = 0;
    let flag = 0;
    let land = 0;
    let rland = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        var i = x + xoff;
        var j = y + yoff;
        if (i > -1 && i < l && j > -1 && j < l && i + "," + j !== x + "," + y) {
          if (this.state.SquareArray[i + "," + j].state.isBomb) {
            if (!this.state.SquareArray[i + "," + j].state.notFlaged) {
              flag++;
            } else {
              bomb++;
            }
          } else if (this.state.SquareArray[i + "," + j].state.notFlaged) {
            if (this.state.SquareArray[i + "," + j].state.revealed) rland++;
            else land++;
          } else flag++;
        }
      }
    }

    var temp = { bomb: bomb, flag: flag, rland: rland, land: land };
    return temp;
  };

  noOfRevealed = () => {
    let l = this.props.data.length;
    let count = 0;
    for (let i = 0; i < l; i++) {
      for (let j = 0; j < l; j++) {
        if (this.state.SquareArray[i + "," + j].state.revealed) count++;
      }
    }
    return count;
  };

  addtoDictonary = (key, ref) => {
    let t = this.state.SquareArray;
    t[key] = ref;
  };

  flagging = (x) => {
    this.props.flagsRemain(x);
  };

  setReveal = (x, y, bool) => {
    this.state.SquareArray[x + "," + y].state.revealed = bool;
    this.state.SquareArray[x + "," + y].state.isClickedOnce = bool;
  };

  countingMinesNear = (x, y) => {
    let grid = this.props.data;
    let l = grid.length;
    if (grid[x][y]) {
      return -1;
    }
    var total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        var i = x + xoff;
        var j = y + yoff;
        if (i > -1 && i < l && j > -1 && j < l) {
          if (grid[i][j]) total++;
        }
      }
    }

    return total;
  };

  renderingRow(arr, i) {
    return (
      <tr key={i}>
        {arr.map((isBomb, j) => {
          return (
            <td key={i + "-" + j}>
              <Square
                isBomb={isBomb}
                Key={String(i + "," + j)}
                Pointer={this.addtoDictonary}
                minesNear={this.countingMinesNear(i, j)}
                revealingNear={this.revealForEmpty}
                revealingWithFlag={this.revealingWithFlag}
                len={arr.length}
                ClickedBomb={this.gameLose}
                ClickedNotBomb={this.notAMineReaction}
                flaged={this.flagging}
              />
            </td>
          );
        })}
      </tr>
    );
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <thead></thead>
          <tbody>
            {this.state.gridData.map((x, i) => {
              return this.renderingRow(x, i);
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default GridMain;
