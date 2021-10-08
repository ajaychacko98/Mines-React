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
            obj.revealLand();
            this.setReveal(i, j, true);
            this.revealForEmpty(i, j);
          } else {
            this.setReveal(i, j, true);
            obj.revealLand();
          }
        }
      }
    }
  };

  notAMineReaction = (x, y, type) => {
    if (type === 0) {
      let obj = this.state.SquareArray[x + "," + y];
      if (!obj.state.revealed) {
        obj.revealLand();
        this.setReveal(x, y, true);
        this.revealForEmpty(x, y);
      }
    } else if (type === 1) {
      let obj = this.state.SquareArray[x + "," + y];
      if (!obj.state.revealed) {
        obj.revealLand();
        this.setReveal(x, y, true);
      }
    }
    // console.log("Previous one " + this.state.noOfLands);
    console.log("New one  " + this.noOfRevealed());
    // this.setState({ noOfLands: this.noOfRevealed() });
    if (this.noOfRevealed() + this.state.noOfMines === this.state.totalCount) {
      this.props.winGame();
    }
  };

  revealNear = (x, y) => {
    let l = this.props.data.length;
    let t = this.state.gridData;
    let arr = [];
    if ((x > 0) & (y > 0)) {
      if ((x <= l - 2) & (y <= l - 2)) {
        // console.log("case 1");
        if (!t[x - 1][y]) arr.push(x - 1 + "," + y);
        if (!t[x + 1][y]) arr.push(x + 1 + "," + y);
        if (!t[x][y - 1]) arr.push(x + "," + (y - 1));
        if (!t[x][y + 1]) arr.push(x + "," + (y + 1));
      } else if (!(x <= l - 2) & (y <= l - 2)) {
        // console.log("case 2");
        if (!t[x - 1][y]) arr.push(x - 1 + "," + y);
        if (!t[x][y - 1]) arr.push(x + "," + (y - 1));
        if (!t[x][y + 1]) arr.push(x + "," + (y + 1));
      } else if ((x <= l - 2) & !(y <= l - 2)) {
        // console.log("case 3");
        if (!t[x - 1][y]) arr.push(x - 1 + "," + y);
        if (!t[x + 1][y]) arr.push(x + 1 + "," + y);
        if (!t[x][y - 1]) arr.push(x + "," + (y - 1));
      } else if (!(x <= l - 2) & !(y <= l - 2)) {
        // console.log("case 9");
        if (!t[x - 1][y]) arr.push(x - 1 + "," + y);
        if (!t[x][y - 1]) arr.push(x + "," + (y - 1));
      }
    } else if ((x === 0) & (y > 0)) {
      if (y <= l - 2) {
        // console.log("case 4");
        if (!t[x + 1][y]) arr.push(x + 1 + "," + y);
        if (!t[x][y - 1]) arr.push(x + "," + (y - 1));
        if (!t[x][y + 1]) arr.push(x + "," + (y + 1));
      } else {
        // console.log("case 5");
        if (!t[x + 1][y]) arr.push(x + 1 + "," + y);
        if (!t[x][y - 1]) arr.push(x + "," + (y - 1));
      }
    } else if ((x > 0) & (y === 0)) {
      if (x <= l - 2) {
        // console.log("case 6");
        if (!t[x - 1][y]) arr.push(x - 1 + "," + y);
        if (!t[x + 1][y]) arr.push(x + 1 + "," + y);
        if (!t[x][y + 1]) arr.push(x + "," + (y + 1));
      } else {
        // console.log("case 7");
        if (!t[x - 1][y]) arr.push(x - 1 + "," + y);
        if (!t[x][y + 1]) arr.push(x + "," + (y + 1));
      }
    } else if ((x === 0) & (y === 0)) {
      // console.log("case 8");
      if (!t[x + 1][y]) arr.push(x + 1 + "," + y);
      if (!t[x][y + 1]) arr.push(x + "," + (y + 1));
    }

    return arr;
  };

  // newLand = () => {
  //   this.setState({ noOfLands: ++this.state.noOfLands });
  //   // this.setState({ noOfLands: this.noOfRevealed() });
  //   console.log(this.state.noOfLands);
  //   console.log(this.noOfRevealed());
  // };

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
                len={arr.length}
                ClickedBomb={this.mineReaction}
                ClickedNotBomb={this.notAMineReaction}
                // onNewLand={this.newLand}
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
