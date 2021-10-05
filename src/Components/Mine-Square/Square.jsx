import React, { Component } from "react";
import "./style.css";

class Square extends Component {
  constructor(props) {
    super(props);
    var keyCode = this.props.Key.split(",");
    this.state = {
      isClickedOnce: false,
      isBomb: this.props.isBomb,
      posx: Number(keyCode[0]),
      posy: Number(keyCode[1]),
      minesNear: this.props.minesNear,
      Symbol: ".",
      totalLen: this.props.len,
    };
  }

  clicked = (x) => {
    // console.log("Clciked at Pos " + this.state.posx + " " + this.state.posy);
    this.setState({ isClickedOnce: true });
    if (this.state.isBomb === true) {
      console.log("Exploded!!!!!!!!!!");
      this.clickedBomb();
    } else {
      // console.log("show number");
      this.clickedNotBomb();
    }
  };

  clickedNotBomb() {
    this.state.Symbol = this.state.minesNear;
  }

  clickedBomb() {
    this.state.Symbol = "#";
  }

  render() {
    let wid = 600 / this.state.totalLen;
    return (
      <div>
        <button
          style={{ width: wid, height: wid, fontSize: "200%" }}
          onClick={this.clicked}
        >
          {this.state.Symbol}
        </button>
      </div>
    );
  }
}

export default Square;
