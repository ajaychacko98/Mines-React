import React, { Component } from "react";
import Square from "../Mine-Square/Square";
import "./style.css";

class GridMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridData: this.props.data,
    };
  }

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
                // ClickedBomb={}
                // ClickedNotBomb={}
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
