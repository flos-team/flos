import styles from "./BottomNavigation.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {feed, global, home, garden, profile, test} from "../redux/pageComponent"
const Nav = () => {
  /** nav바에 이동에 따라 컴포넌트를 불러오고 아이콘을 바꾸는 함수 */
  /** store에서 현재 페이지의 상태를 가져온다. */
  const position = useSelector((state) => state.page.value);
  // console.log(position)
  const dispatch = useDispatch();
  return (
    <div className={styles.FooterDiv}>
      <div className={styles.FooterNavBar}>
        <div
          className={`${position === "feed" ? styles.Feed2 : ""} ${styles.Feed}`}
          onClick={() => dispatch(feed())}
        ></div>
        <div
          className={`${position === "global" ? styles.Global2 : ""} ${styles.Global}`}
          onClick={() => dispatch(global())}
        ></div>
        <div
          className={`${position === "home" ? styles.Home2 : ""} ${styles.Home}`}
          onClick={() => dispatch(home())}
        ></div>
        <div
          className={`${position === "garden" ? styles.Garden2 : ""} ${styles.Garden}`}
          onClick={() => dispatch(garden())}
        ></div>
        <div
          className={`${position === "profile" ? styles.Profile2 : ""} ${styles.Profile}`}
          onClick={() => dispatch(profile())}
        ></div>
        <div
          className={`${position === "test" ? styles.Test2 : ""} ${styles.Test}`}
          onClick={()=> dispatch(test())}
        >
        </div>
      </div>
    </div>
  );
};

export default Nav;
