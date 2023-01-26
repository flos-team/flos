import styles from "./BottomNavigation.module.css";
import React from "react";

const Nav = ({ position, getPosition }) => {
  const onClickNav = (e) => {
    console.log(e);
    getPosition(e);
  }

  return (
    <div className={styles.FooterDiv}>
      <div className={styles.FooterNavBar}>
          <div className={`${position ==='feed' ? styles.Feed2: ""} ${styles.Feed}`} onClick={(e)=>onClickNav('feed')}></div>
          <div className={`${position ==='global' ? styles.Global2: ""} ${styles.Global}`} onClick={(e)=>onClickNav('global')}></div>
          <div className={`${position ==='home' ? styles.Home2: ""} ${styles.Home}`} onClick={(e)=>onClickNav('home')}></div>
          <div className={`${position ==='garden' ? styles.Garden2: ""} ${styles.Garden}`} onClick={(e)=>onClickNav('garden')}></div>
          <div className={`${position ==='profile' ? styles.Profile2: ""} ${styles.Profile}`}onClick={(e)=>onClickNav('profile')}></div>
      </div>
    </div>
  );
};

export default Nav;
