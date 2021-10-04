import React, { Component } from "react";
import GridMain from "../Grid/GridMain";
import Square from "../Mine-Square/Square";
import "./style.css";

class MainBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bombArray: [
        [true, false, false, false],
        [false, true, false, false],
        [false, true, false, false],
        [false, true, false, true],
      ],
    };
  }

  renderSquareArray() {
    var tempArray = this.state.bombArray;
    var returnComponent = new Array(tempArray.length);
    for (let i = 0; i < tempArray.length; i++) {
      returnComponent[i] = new Array(tempArray.length);
    }

    for (let i = 0; i < tempArray.length; i++) {
      for (let j = 0; j < tempArray.length; j++) {
        if (Number(tempArray[i][j]) === true) {
          returnComponent[i][j] = this.renderSquare(true, i, j);
        } else {
          returnComponent[i][j] = this.renderSquare(false, i, j);
        }
      }
    }
    return returnComponent;
  }

  renderSquare(bomb, keyi, keyj) {
    return <Square isBomb={bomb} key={keyi + "," + keyj} />;
  }

  clickCalled(x) {
    console.log(x + "clicked");
  }

  renderGrid() {
    return (
      <React.Fragment>
        <GridMain data={this.state.bombArray} clicked={this.clickCalled} />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="Dark-Blue-Background">
          <div className="Menu-Tab"> </div>
          <div className="MainBoard-Background">
            {/* {this.renderSquareArray()} */}
            {this.renderGrid()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainBoard;
