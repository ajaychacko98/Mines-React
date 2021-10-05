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
      score: this.getTemp(),
      noOfMines: 5,
    };
  }

  getTemp = () => {
    return 0 | Number(localStorage.getItem("score"));
  };

  setTemp = (key) => {
    localStorage.setItem("score", key);
  };

  renderSquareArray() {
    var tempArray = this.state.bombArray;
    var returnComponent = new Array(tempArray.length);
    for (let i = 0; i < tempArray.length; i++) {
      returnComponent[i] = new Array(tempArray.length);
    }
    for (let i = 0; i < tempArray.length; i++) {
      for (let j = 0; j < tempArray.length; j++) {
        returnComponent[i][j] = this.renderSquare(tempArray[i][j], i, j);
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

  won = () => {
    let s = this.state.score + 1;
    this.setState({ score: s });
    this.setTemp(s);
    setTimeout(function () {
      alert("You Won the Game");
    }, 5);
    window.location.reload();
  };

  renderGrid() {
    return (
      <React.Fragment>
        <GridMain
          data={this.state.bombArray}
          clicked={this.clickCalled}
          winGame={this.won}
          minesCount={this.state.noOfMines}
        />
      </React.Fragment>
    );
  }

  resetScore = () => {
    this.setTemp(0);
    this.setState({ score: 0 });
  };

  render() {
    return (
      <React.Fragment>
        <div className="Dark-Blue-Background">
          <h2> Score : {this.state.score}</h2>
          <button onClick={this.resetScore}> Clear Score</button>
          <div className="Menu-Tab"> </div>
          <div className="MainBoard-Background">{this.renderGrid()}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainBoard;
