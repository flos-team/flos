/* import react */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import img */
import userImg from "../../assets/DummyData/dummy-sample.jpg";

/* import component */
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import UserInfoItem from "./UserInfoItem/UserInfoItem";

/* import css */
import "./FollowerViewPage.css";

const FollowerViewPage = ({ userNickName }) => {
  const [userInfoList, setUserInfoList] = useState([<></>]);

  let n = 8;
  useEffect(() => {
    setUserInfoList([...Array(5)].map((e, i) => <UserInfoItem></UserInfoItem>));
  }, []);
  return (
    <>
      <HeaderComponent backVisible={true} pageName={"김채원"}></HeaderComponent>
      <div className="follower-view-container">
        <div className="follower-view-nav">
          <div className="follower-nav-btn focus-tab">
            <p>팔로워</p>
          </div>
          <div className="following-nav-btn">
            <p>팔로잉</p>
          </div>
        </div>
        <div className="follower-info-container">{userInfoList}</div>
      </div>
    </>
  );
};

export default FollowerViewPage;
