import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/* import css */
import "./MainPage.css";

/* immport compoent */
import BottomNavigation from "../../../components/BottomNavigation/BottomNavigation";
import Feed from "../FeedPage/FeedPage";

/* import Page */
import ProfilePage from "../ProfilePage/ProfilePage";
import HomePage from "../HomePage";
import GlobalPage from "../GlobalPage";
import GardenPage from "../GardenPage";

function Main() {
  const [isToast, setIsToast] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  // useEffect(() => {
  //   if (!isChecked) {
  //     setIsToast(false);
  //   }
  // }, [isToast]);

  const position = useSelector((state) => state.page.value);
  // console.log(position + " in Main")
  // const user = useSelector((state) => state.user.userData);
  // console.log(user);

  let currentPage;
  if (position === "feed") {
    currentPage = <Feed setIsToast={setIsToast} />;
  } else if (position === "global") {
    currentPage = <GlobalPage setIsToast={setIsToast}></GlobalPage>;
  } else if (position === "home") {
    currentPage = <HomePage setIsToast={setIsToast} />;
  } else if (position === "garden") {
    currentPage = <GardenPage setIsToast={setIsToast} />;
  } else if (position === "profile") {
    currentPage = <ProfilePage setIsToast={setIsToast}></ProfilePage>;
  } else {
    currentPage = <div>404</div>;
  }

  return (
    <div className="main-page">
      <div className="main">{currentPage}</div>
      <div className="footer">
        <BottomNavigation
          isToast={isToast}
          setIsToast={setIsToast}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        ></BottomNavigation>
      </div>
    </div>
  );
}

export default Main;
