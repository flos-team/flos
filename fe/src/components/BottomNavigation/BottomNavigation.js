import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feed, global, home, garden, profile, test } from "../../redux/pageComponent"

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

const Nav = () => {
  /** nav바에 이동에 따라 컴포넌트를 불러오고 아이콘을 바꾸는 함수 */
  /** store에서 현재 페이지의 상태를 가져온다. */
  const position = useSelector((state) => state.page.value);
  const dispatch = useDispatch();

  const [navItems, setNavItems] = useState([
    { navId: "feed", navIcon: feedIcon, navIconClick:feedIconClick, clickAction: () => dispatch(feed()) },
    { navId: "global", navIcon: globalIcon, navIconClick:globalIconClick, clickAction:() => dispatch(global()) },
    { navId: "home", navIcon: homeIcon, navIconClick:homeIconPlus, clickAction:() => dispatch(home())},
    { navId: "garden", navIcon: gardenIcon, navIconClick:gardenIconClick, clickAction:() => dispatch(garden()) },
    { navId: "profile", navIcon: profileIcon, navIconClick:profileIconClick, clickAction:() => dispatch(profile()) },
  ]);

  const navItemList = navItems.map(({ navId, navIcon, navIconClick, clickAction }) => (
    <div key={navId} className="bottom-nav-item" onClick={clickAction}><img key={navIcon} src={navId==position?navIconClick:navIcon} /></div>
  ));
  
  return (
    <>
      <div className="bottom-nav-bar">
        {navItemList}
      </div>
    </>
  );
};

export default Nav;
