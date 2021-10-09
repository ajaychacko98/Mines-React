import React, { Component } from "react";
import "./style.css";
import { ReactComponent as Flag } from "./Flag.svg";
import { ReactComponent as Mine } from "./Mine.svg";
import { Tooltip } from "react-tippy";

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
      Symbol: "",
      totalLen: this.props.len,
      color: "azure",
      showBomb: false,
      revealed: false,
      notFlaged: true,
      hover: "none",
      key: keyCode,
    };
  }

  revealLand = () => {
    if (!this.state.isClickedOnce && !this.state.revealed) {
      this.setState({ revealed: true });
      this.setState({ isClickedOnce: true });
    }
    if (this.state.isBomb) {
      if (!this.state.notFlaged) {
        this.setState({ notFlaged: true });

        this.setState({ showBomb: true });
      } else {
        this.setState({ color: "red" });
        this.setState({ showBomb: true });
      }

      return;
    }
    if (this.state.minesNear !== 0) {
      this.setState({ Symbol: this.state.minesNear });
    }
    this.setState({ color: "gray" });
  };

  clickedLeftMouse = () => {
    if (
      !this.state.isClickedOnce &&
      !this.state.revealed &&
      this.state.notFlaged
    ) {
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
    if (this.state.notFlaged && !this.state.revealed) {
      this.setState({ color: "green" });
      this.setState({ notFlaged: false });
      this.setState({
        Symbol: "",
      });
      this.props.flaged(false);
    } else if (!this.state.notFlaged && !this.state.revealed) {
      this.setState({
        Symbol: "",
      });
      this.setState({ notFlaged: true });
      this.setState({ color: "azure" });
      this.props.flaged(true);
    }
  };

  onMouseDownAction = (x) => {
    if (x.button === 0) this.clickedLeftMouse(x);
    else if (x.button === 1) this.clickedMiddleMouse(x);
  };

  clickedMiddleMouse = (x) => {
    if (this.state.revealed)
      this.props.revealingWithFlag(this.state.posx, this.state.posy);
    else if (!this.state.revealed && this.state.minesNear === 0) {
      this.props.revealingNear(this.state.posx, this.state.posy, 0);
    } else console.log("Current Cell need to be revealed first");
  };

  clickedBomb() {
    this.setState({ color: "crimson" });
    this.props.ClickedBomb();
  }

  handleMouseIn = () => {
    this.setState({ hover: "block" });
  };

  handleMouseOut = () => {
    this.setState({ hover: "none" });
  };

  render() {
    let wid = Math.floor(700 / this.state.totalLen);
    console.log(`Width is ${wid}`);
    return (
      <div>
        <Tooltip
          trigger=""
          html={
            <div>
              No of Mines: {this.state.minesNear} <br />
              Flag Set: {!this.state.notFlaged ? " Yes" : "NO"} <br />
              Revealed: {this.state.revealed ? "Yes" : "NO"}
            </div>
          }
        >
          <div
            className="Grid-Element"
            style={{
              width: wid,
              height: wid,
              backgroundColor: this.state.color,
              // fontSize: "200%",
            }}
            onMouseOver={this.handleMouseIn}
            onMouseOut={this.handleMouseOut}
            onContextMenu={this.clickedRightMouse}
            onMouseDown={this.onMouseDownAction}
          >
            <Flag hidden={this.state.notFlaged} />
            <Mine hidden={!this.state.showBomb} />

            {this.state.Symbol}
          </div>
        </Tooltip>
      </div>
    );
  }
}

export default Square;
