import styles from "./LandingPage1.module.css";
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className={styles.landingRoot}>
  
      {/* <video className={styles.test} muted autoPlay loop src="night.mp4" /> */}
      {/* <video className={styles.test} muted autoPlay loop src="day.mp4" /> */}
      <video className={styles.test} muted autoPlay loop src="vibe.mp4" />

      <div className={styles.groomsSmall2}></div>
      <div className={styles.mainLogo}>
        <div className={styles.title}>Flos</div>
        <div className={styles.subTitle}>당신의 마음이 꽃 피는 곳</div>
      </div>
      <div className={styles.guideText}>
        <Link to="/login">
          <div className={`${styles.startBtn} ${styles.blinking}`}>
            탭하여 시작하기
          </div>
        </Link>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.footer}>
        <div className={styles.copyright}>
          <div className = {styles.copyrightText}>©CopyRight Flos All Right Reserved</div>
          
        </div>
      </div>
    </div>
  );
}

export default Landing;
