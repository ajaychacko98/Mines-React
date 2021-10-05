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
      color: "azure",
    };
  }

  clicked = (x) => {
    // console.log("Clciked at Pos " + this.state.posx + " " + this.state.posy);
    if (!this.state.isClickedOnce)
      if (this.state.isBomb) {
        this.setState({ isClickedOnce: true });
        this.clickedBomb();
      } else {
        this.setState({ isClickedOnce: true });
        this.clickedNotBomb();
      }
  };

  clickedNotBomb() {
    this.setState({ Symbol: this.state.minesNear });
    this.setState({ color: "gray" });
    this.props.ClickedNotBomb(this.state.posx, this.state.posy);
  }

  clickedBomb() {
    this.setState({ Symbol: "#" });
    this.setState({ color: "crimson" });
    this.props.ClickedBomb();
  }

  changeVisible() {
    if (!this.state.isBomb) {
      this.setState({ Symbol: this.state.minesNear });
      this.setState({ color: "gray" });
    }
  }

  render() {
    let wid = 600 / this.state.totalLen;
    return (
      <div>
        <button
          style={{
            width: wid,
            height: wid,
            backgroundColor: this.state.color,
            fontSize: "200%",
          }}
          onClick={this.clicked}
        >
          {this.state.Symbol}
        </button>
      </div>
    );
  }
}

export default Square;
