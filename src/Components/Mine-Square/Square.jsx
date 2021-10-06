import React, { Component } from "react";
import "./style.css";

class Square extends Component {
  constructor(props) {
    super(props);
    // this.myRef = React.;
    // console.log(React.createRef());
    var keyCode = this.props.Key.split(",");
    this.props.Pointer(this.props.Key, this);
    this.state = {
      isClickedOnce: false,
      isBomb: this.props.isBomb,
      posx: Number(keyCode[0]),
      posy: Number(keyCode[1]),
      minesNear: this.props.minesNear,
      Symbol: ".",
      totalLen: this.props.len,
      color: "azure",
      revealed: false,
      key: keyCode,
    };
  }

  revealLand = () => {
    if (!this.state.isClickedOnce && !this.state.revealed) {
      this.setState({ revealed: true });
      this.setState({ isClickedOnce: true });
      this.props.onNewLand();
    }
    this.setState({ Symbol: this.state.minesNear });
    this.setState({ color: "gray" });
  };

  clicked = (x) => {
    if (!this.state.isClickedOnce && !this.state.revealed) {
      this.setState({ revealed: true });
      this.setState({ isClickedOnce: true });
      if (this.state.isBomb) {
        this.clickedBomb();
      } else {
        this.clickedNotBomb();
      }
    }
  };

  clickedNotBomb() {
    this.setState({ Symbol: this.state.minesNear });
    this.setState({ color: "gray" });
    this.props.ClickedNotBomb(this.state.posx, this.state.posy, 0);
  }

  clickedBomb() {
    this.setState({ Symbol: "#" });
    this.setState({ color: "crimson" });
    this.props.ClickedBomb();
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
