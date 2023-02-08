import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Seed from "../../assets/HomeAsset/seed.svg";
import Diamond from "../../assets/HomeAsset/diamond.svg";
import Flowering from "../../assets/HomeAsset/flowering.svg";

class GrowProgressBar extends React.Component {
  render() {
    const percent = this.props.CurrentGrowthValue / this.props.MaxGrowthValue * 100;
    return (
      <ProgressBar
        percent={ percent }
        filledBackground={this.props.growProgressBackgroundColor}
        width="80%"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="10"
              src={Seed}
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="5"
              src={Diamond}
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="5"
              src={Diamond}
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="5"
              src={Diamond}
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `(${accomplished ? 0 : 80}%)` }}
              width="15"
              src={Flowering}
            />
          )}
        </Step>
      </ProgressBar>
    );
  }
}

export default GrowProgressBar;