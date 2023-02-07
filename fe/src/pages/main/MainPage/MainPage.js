import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {setUserId} from "../../../redux/user";

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
  const dispatch = useDispatch();

  const [isToast, setIsToast] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isChecked) {
      setIsToast(true);
    }
  }, [isToast]);

  const position = useSelector((state) => state.page.value);
  const userId = useSelector((state) => state.user.userId);

  console.log(userId)
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
