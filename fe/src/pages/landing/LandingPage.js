/* import react */
import styles from "./LandingPage.module.css";
import React from "react";
import { Link } from "react-router-dom";

/* import img */
import groomSmile from "../../assets/GoormAsset/goorm-smile.png";

/* import component */

/* import css */
import "./LandingPage.css";

function Landing() {
  return (
    <>
      <Link to="/login">
        <div className="landing-page-container">
          <div className="groom-img-cotainer" style={{backgroundImage:`url(${groomSmile})`}}></div>
          <div className="main-title-div">
            <p>FLOS</p>
            <p>당신의 마음이 꽃피는 곳</p>
          </div>
          <div className="tab-text-div blinking">
            <p>탭하여 시작하기</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Landing;
