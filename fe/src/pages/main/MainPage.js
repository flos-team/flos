import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../../components/BottomNavigation";
import Feed from "./FeedPage";
/* 프로필 페이지 import */
import ProfilePage from "./ProfilePage/ProfilePage";
import HomePage from "./HomePage";
import GlobalPage from "./GlobalPage";

function Main() {
  const position = useSelector((state) => state.page.value);
  // console.log(position + " in Main")
  let currentPage;
  if (position === "feed") {
    currentPage = <Feed />;
  } else if (position === "global") {
    currentPage = <GlobalPage></GlobalPage>;
  } else if (position === "home") {
    currentPage = <HomePage />;
  } else if (position === "garden") {
    currentPage = <div>garden</div>;
  } else if (position === "profile") {
    currentPage = <ProfilePage />;
  } else {
    currentPage = <div>404</div>;
  }
  return (
    <div>
      {currentPage}
      <Nav></Nav>
    </div>
  );
}

export default Main;
