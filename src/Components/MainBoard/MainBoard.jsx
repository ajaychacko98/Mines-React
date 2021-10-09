import React, { Component } from "react";
import GridMain from "../Grid/GridMain";
import "./style.css";

class MainBoard extends Component {
  constructor(props) {
    super(props);
    var noOfFlag = this.setNoOfFlags(80);
    this.state = {
      noOfMines: noOfFlag,
      flags: noOfFlag,
      bombArray: this.mineGenerator(noOfFlag, 20),
      score: this.getTemp(),
    };
  }

  //#region  Score , Game Management
  won = () => {
    this.setState({ score: ++this.state.score });
    this.setTemp(this.state.score);
    console.log("You have won...");
    setTimeout(function () {
      alert("You Won the Game");
    }, 10);
    window.location.reload();
  };

  resetScore = () => {
    this.setTemp(0);
    this.setState({ score: 0 });
    window.location.reload();
  };
  //#endregion

  setNoOfFlags = (x) => {
    return Number(x);
  };

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

  flagsRemaining = (x) => {
    if (x) {
      this.setState({ flags: ++this.state.flags });
    } else {
      this.setState({ flags: --this.state.flags });
    }
  };

  renderGrid() {
    return (
      <React.Fragment>
        <GridMain
          data={this.state.bombArray}
          clicked={this.clickCalled}
          winGame={this.won}
          minesCount={this.state.noOfMines}
          flagsRemain={this.flagsRemaining}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="Dark-Blue-Background">
          <div style={{ textAlign: "center" }}>
            {" "}
            <h2> Score : {this.state.score}</h2>
            <button onClick={this.resetScore}> Clear Score</button>
            <br />
            <span style={{ fontSize: "2em" }}>Flags: {this.state.flags} </span>
            <br />
          </div>

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
