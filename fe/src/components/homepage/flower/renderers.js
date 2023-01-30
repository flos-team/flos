import React, { PureComponent } from "react";

class Box extends PureComponent {
  render() {
    const size = 10;    // 물체의 사이즈
    const x = this.props.x - size / 2;
    const y = this.props.y - size / 2;
    return (
      <div style={{ position: "absolute", width: size, height: size, backgroundColor: "red", left: x, top: y }} />
    );
  }
}

export { Box };