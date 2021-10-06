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

  LandsDug = () => {
    let c = 0;
    for (const [value] of Object.entries(this.state.SquareArray)) {
      if (value.state.revealed) {
        c++;
      }
    }
    this.setState({ noOfLands: c });
  };

  notAMineReaction = (x, y, times) => {
    this.newLand();
    let reveals = this.revealNear(x, y);
    // let allCords = reveals;
    // let remains = [];
    for (let i = 0; i < reveals.length; i++) {
      let obj = this.state.SquareArray[reveals[i]];
      if (!obj.state.revealed) {
        if (obj.state.minesNear === 0) {
          // remains.push(obj);
        }
        obj.revealLand();
      }
    }
    // console.log("Accual All cords " + allCords);
    // if (remains.length > 0) {
    //   console.log("did it and remains " + remains.length);
    //   remains.forEach((p) => {
    //     let rest = this.revealNear(p.state.posx, p.state.posy);
    //     console.log("Rest was " + rest.length);
    //     for (let i = 0; i < rest.length; i++) {
    //       if (!allCords.includes(rest[i]) && rest[i] != x + "," + y) {
    //         console.log("Rest of all :" + rest[i]);
    //         let obj = this.state.SquareArray[rest[i]];
    //         if (!obj.state.revealed) {
    //           obj.revealLand();
    //         }
    //       }
    //     }
    //   });
    // }

    console.log(this.state.noOfLands);
    if (this.state.noOfLands + this.state.noOfMines === this.state.totalCount) {
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

  newLand = () => {
    this.setState({ noOfLands: ++this.state.noOfLands });
  };

  addtoDictonary = (key, ref) => {
    let t = this.state.SquareArray;
    t[key] = ref;
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
                minesNear={this.noOfMines(i, j)}
                len={arr.length}
                ClickedBomb={this.mineReaction}
                ClickedNotBomb={this.notAMineReaction}
                onNewLand={this.newLand}
                Revealed={false}
                Pointer={this.addtoDictonary}
              />
            </td>
          );
        })}
      </tr>
    );
  }

  noOfMines(x, y) {
    let mines = 0;
    let temp = this.state.gridData;
    let l = temp.length;
    if (temp[x][y]) return -1;
    if ((x > 0) & (y > 0)) {
      if ((x <= l - 2) & (y <= l - 2)) {
        if (temp[x - 1][y - 1]) mines++;
        if (temp[x - 1][y]) mines++;
        if (temp[x - 1][y + 1]) mines++;
        if (temp[x][y - 1]) mines++;
        if (temp[x][y + 1]) mines++;
        if (temp[x + 1][y - 1]) mines++;
        if (temp[x + 1][y]) mines++;
        if (temp[x + 1][y + 1]) mines++;
      } else if (!(x <= l - 2) & (y <= l - 2)) {
        if (temp[x - 1][y - 1]) mines++;
        if (temp[x - 1][y]) mines++;
        if (temp[x - 1][y + 1]) mines++;
        if (temp[x][y - 1]) mines++;
        if (temp[x][y + 1]) mines++;
      } else if ((x <= l - 2) & !(y <= l - 2)) {
        if (temp[x - 1][y - 1]) mines++;
        if (temp[x - 1][y]) mines++;
        if (temp[x][y - 1]) mines++;
        if (temp[x + 1][y - 1]) mines++;
        if (temp[x + 1][y]) mines++;
      } else if (!(x <= l - 2) & !(y <= l - 2)) {
        if (temp[x - 1][y - 1]) mines++;
        if (temp[x - 1][y]) mines++;
        if (temp[x][y - 1]) mines++;
      }
    } else if ((x === 0) & (y > 0)) {
      if (y <= l - 2) {
        if (temp[x][y - 1]) mines++;
        if (temp[x][y + 1]) mines++;
        if (temp[x + 1][y - 1]) mines++;
        if (temp[x + 1][y]) mines++;
        if (temp[x + 1][y + 1]) mines++;
      } else {
        if (temp[x][y - 1]) mines++;
        if (temp[x + 1][y - 1]) mines++;
        if (temp[x + 1][y]) mines++;
      }
    } else if ((x > 0) & (y === 0)) {
      if (x <= l - 2) {
        if (temp[x - 1][y]) mines++;
        if (temp[x - 1][y + 1]) mines++;
        if (temp[x][y + 1]) mines++;
        if (temp[x + 1][y]) mines++;
        if (temp[x + 1][y + 1]) mines++;
      } else {
        if (temp[x - 1][y]) mines++;
        if (temp[x - 1][y + 1]) mines++;
        if (temp[x][y + 1]) mines++;
      }
    } else if ((x === 0) & (y === 0)) {
      if (temp[x][y + 1]) mines++;
      if (temp[x + 1][y]) mines++;
      if (temp[x + 1][y + 1]) mines++;
    }
    return mines;
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
