import React from "react";
import { useSelector } from "react-redux";

/* import css */
import "./MainPage.css";

/* immport compoent */
import Nav from "../../../components/BottomNavigation/BottomNavigation";
import Feed from "../FeedPage/FeedPage";

/* import Page */
import ProfilePage from "../ProfilePage/ProfilePage";
import HomePage from "../HomePage";
import GlobalPage from "../GlobalPage";
import GardenPage from "../GardenPage";

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
    currentPage = <GardenPage />;
  } else if (position === "profile") {
    currentPage = <ProfilePage />;
  } else {
    currentPage = <div>404</div>;
  }
  return (
    <div className="main-page">
      <div className="main">
        {currentPage}
      </div>
      <div className="footer">
        <Nav></Nav>
      </div>
    </div>
  );
}

export default Main;
