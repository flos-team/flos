import styles from "./LandingPage.module.css";
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className={styles.landingRoot}>
      <div className={styles.groomsSmall2}></div>
      <div className={styles.mainLogo}>
        <div className={styles.title}>Flos</div>
        <div className={styles.subTitle}>당신의 마음이 꽃 피는 곳</div>
      </div>
      <div className={styles.guideText}>
        <Link to="/login">
          <div className={`${styles.startBtn} ${styles.blinking}`}>탭하여 시작하기</div>
        </Link>
      </div>
      <div className={styles.spacer}></div>
    </div>
  );
}

export default Landing;
