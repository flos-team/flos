import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feed, global, home, garden, profile } from "../../redux/page";
import { Link } from "react-router-dom";
import { setIsToastValue } from "../../redux/toast";

/* img assets import */
import feedIcon from "../../assets/NavBar/feed-icon.png";
import feedIconClick from "../../assets/NavBar/feed-icon-click.png";
import globalIcon from "../../assets/NavBar/global-icon.png";
import globalIconClick from "../../assets/NavBar/global-icon-click.png";
import homeIcon from "../../assets/NavBar/home-icon.png";
import homeIconPlus from "../../assets/NavBar/home-icon-plus.png";
import gardenIcon from "../../assets/NavBar/garden-icon.png";
import gardenIconClick from "../../assets/NavBar/garden-icon-click.png";
import profileIcon from "../../assets/NavBar/profile-icon.png";
import profileIconClick from "../../assets/NavBar/profile-icon-click.png";

/* CSS Import */
import "./BottomNavigation.css";

const BottomNavigation = ({ isToast, setIsToast, isChecked, setIsChecked }) => {
  /** nav바에 이동에 따라 컴포넌트를 불러오고 아이콘을 바꾸는 함수 */
  /** store에서 현재 페이지의 상태를 가져온다. */
  const position = useSelector((state) => state.page.value);
  const dispatch = useDispatch();

  const [navItems, setNavItems] = useState([
    {
      navId: "feed",
      navIcon: feedIcon,
      navIconClick: feedIconClick,
      clickAction: () => dispatch(feed()),
    },
    {
      navId: "global",
      navIcon: globalIcon,
      navIconClick: globalIconClick,
      clickAction: () => dispatch(global()),
    },
    {
      navId: "home",
      test: 1,
      navIcon: homeIcon,
      navIconClick: homeIconPlus,
      clickAction: () => dispatch(home()),
    },
    {
      navId: "garden",
      navIcon: gardenIcon,
      navIconClick: gardenIconClick,
      clickAction: () => dispatch(garden()),
    },
    {
      navId: "profile",
      navIcon: profileIcon,
      navIconClick: profileIconClick,
      clickAction: () => dispatch(profile()),
    },
  ]);

  const toastValue = useSelector((state) => state.toast.isToast);
  const toastText = useSelector((state) => state.toast.toastMessage);
  useEffect(() => {
    setToastItem(toastValue ? toastDivUp : toastDiv);
  }, [toastValue]);
  const [toastItem, setToastItem] = useState();
  const toastDiv = (
    <div className="toast-message-div">
      <div className="toast-message">{toastText}</div>
      <div className="check-btn">확인</div>
    </div>
  );
  const toastDivUp = (
    <div className="toast-message-div toast-up ">
      <div className="toast-message">{toastText}</div>
      <div
        className="check-btn"
        onClick={(e) => {
          // setIsToast(false);
          // setIsChecked(true);
          dispatch(setIsToastValue(false));
        }}
      >
        확인
      </div>
    </div>
  );

  const navItemList = navItems.map(({ navId, navIcon, navIconClick, clickAction }) => (
    <Link key={navId} to={position === "home" && navId == "home" ? "/main/write" : ""}>
      <div key={navId} className="bottom-nav-item" onClick={clickAction}>
        <img key={navIcon} src={navId == position ? navIconClick : navIcon} />
      </div>
    </Link>
  ));

  return (
    <>
      <div className="bottom-nav-container">
        {toastItem}
        <div className="bottom-nav-bar">{navItemList}</div>
      </div>
    </>
  );
};

export default BottomNavigation;
