import styles from "./BottomNavigation.module.css";
import React from "react";

const Nav = ({ getPosition }) => {
  const onClickNav = (e) => {
    console.log(e);
    getPosition(e);
  }

  return (
    <div className={styles.FooterDiv}>
      <div className={styles.FooterNavBar}>
          <div className={styles.Post} onClick={(e)=>onClickNav('feed')}>Feed</div>
          <div className={styles.Global} onClick={(e)=>onClickNav('global')}>Global</div>
          <div className={styles.Home} onClick={(e)=>onClickNav('home')}>home</div>
          <div className={styles.Garden} onClick={(e)=>onClickNav('garden')}>garden</div>
          <div className={styles.Profile} onClick={(e)=>onClickNav('profile')}>profile</div>
      </div>
    </div>
  );
};

export default Nav;
