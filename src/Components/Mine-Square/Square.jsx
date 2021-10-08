import React, { Component } from "react";
import "./style.css";
import { ReactComponent as Flag } from "./Flag.svg";

class Square extends Component {
  constructor(props) {
    super(props);
    var keyCode = this.props.Key.split(",");
    this.props.Pointer(this.props.Key, this);
    this.state = {
      isClickedOnce: false,
      isBomb: this.props.isBomb,
      posx: Number(keyCode[0]),
      posy: Number(keyCode[1]),
      minesNear: this.props.minesNear,
      Symbol: this.props.minesNear,
      totalLen: this.props.len,
      color: "azure",
      revealed: false,
      notFlaged: true,
      key: keyCode,
    };
  }

  revealLand = () => {
    if (!this.state.isClickedOnce && !this.state.revealed) {
      this.setState({ revealed: true });
      this.setState({ isClickedOnce: true });
      // this.props.onNewLand();
    }
    if (!this.state.minesNear === 0) {
      this.setState({ Symbol: this.state.minesNear });
    }
    this.setState({ color: "gray" });
  };

  clicked = () => {
    if (!this.state.isClickedOnce && !this.state.revealed) {
      // this.props.onNewLand();
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
    if (this.state.minesNear === 0) {
      this.props.ClickedNotBomb(this.state.posx, this.state.posy, 0);
    } else {
      this.setState({ Symbol: this.state.minesNear });
      this.props.ClickedNotBomb(this.state.posx, this.state.posy, 1);
    }
    this.setState({ color: "gray" });
  }

  clickedRightMouse = (x) => {
    x.preventDefault();
    if (this.state.notFlaged) {
      // this.setState({ revealed: true });
      // this.setState({ isClickedOnce: true });
      this.setState({ color: "green" });
      this.setState({ notFlaged: false });
      this.setState({ Symbol: "" });
      this.props.flaged(false);
    } else if (!this.state.notFlaged) {
      // this.setState({ revealed: false });
      // this.setState({ isClickedOnce: false });
      this.setState({ Symbol: this.state.minesNear });
      this.setState({ notFlaged: true });
      this.setState({ color: "azure" });
      this.props.flaged(true);
    }
  };

  clickedBomb() {
    this.setState({ Symbol: "#" });
    this.setState({ color: "crimson" });
    this.props.ClickedBomb();
  }

  render() {
    let wid = Math.floor(600 / this.state.totalLen);
    return (
      <div>
        <div
          className="Grid-Element"
          style={{
            width: wid,
            height: wid,
            backgroundColor: this.state.color,
            fontSize: "200%",
          }}
          onClick={this.clicked}
          onContextMenu={this.clickedRightMouse}
        >
          <Flag hidden={this.state.notFlaged} />
          {this.state.Symbol}
        </div>
      </div>
    );
  }
}

export default Square;
