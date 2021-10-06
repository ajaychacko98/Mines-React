import React, { Component } from "react";
import GridMain from "../Grid/GridMain";
import "./style.css";

class MainBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfMines: 6,
      bombArray: this.mineGenerator(6, 6),
      score: this.getTemp(),
    };
  }

  //#region  Score , Game Management
  won = () => {
    let s = this.state.score + 1;
    this.setState({ score: s });
    this.setTemp(s);
    setTimeout(function () {
      alert("You Won the Game");
    }, 5);
    window.location.reload();
  };
  resetScore = () => {
    this.setTemp(0);
    this.setState({ score: 0 });
    window.location.reload();
  };
  //#endregion

  mineGenerator = (n, size) => {
    let i = 0;
    var returnComponent = new Array(size);
    for (let i = 0; i < size; i++) {
      returnComponent[i] = new Array(size).fill(false);
    }
    while (i < n) {
      let x = this.randomNumber(size);
      let y = this.randomNumber(size);
      if (!returnComponent[x][y]) {
        i++;
        returnComponent[x][y] = true;
      }
    }
    return returnComponent;
  };

  randomNumber(n) {
    return Math.floor(Math.random() * n);
  }

  renderGrid() {
    // this.mineGenerator(20, 10);
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
  //#region  LocalStorage Methods
  getTemp = () => {
    return 0 | Number(localStorage.getItem("score"));
  };

  setTemp = (key) => {
    localStorage.setItem("score", key);
  };
  //#endregion
}

export default MainBoard;
