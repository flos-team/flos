import { render } from "@testing-library/react";
// import React from "react";
import { useState } from "react";
/* 컴포넌트에서 사용할 이미지 에셋 import */
import userImg from "../../../assets/GlobalAsset/user-img.png";
import sunnyImg from "../../../assets/GlobalAsset/sunny.png";
import questionMark from "../../../assets/ProfileAsset/question-mark.png";

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../components/PostItem/PostItem";

/* Profile Page 전용 CSS import */
import "./ProfilePage.css";

const ProfilePage = () => {
  const userName = "wonny";
  const postTime = "1시간 전";
  const [userInfoNames, setUserInfoNames] = useState([
    { userInfoId: 1, userInfoName: "팔로워" },
    { userInfoId: 2, userInfoName: "팔로잉" },
    { userInfoId: 3, userInfoName: "게시글" },
    { userInfoId: 4, userInfoName: "꽃송이" },
  ]);
  const [userInfos, setUserInfos] = useState([
    { userInfoId: 1, userInfo: 999 },
    { userInfoId: 2, userInfo: 999 },
    { userInfoId: 3, userInfo: 999 },
    { userInfoId: 4, userInfo: 999 },
  ]);
  // 제목
  const userInfoNameList = userInfoNames.map(({ userInfoId, userInfoName }) => (
    <li key={userInfoId}>{userInfoName}</li>
  ));
  // 내용
  const userInfoList = userInfos.map(({ userInfoId, userInfo }) => (
    <li key={userInfoId}>{userInfo >= 999 ? "999+" : userInfo}</li>
  ));
  // 감정 아이템 채택 수?
  const moodCount = 123;
  const moodCountText = <p>{moodCount >= 99 ? "99+" : moodCount}</p>;
  // 댓글 수
  const commentCount = 123;
  const commentCountText = <p>{commentCount >= 99 ? "99+" : commentCount}</p>;

  const n = 8; // Or something else
  const postList = [...Array(n)].map((e, i) => <PostItem mood={"RAINY"} userName={"wonnny"}></PostItem>);

  return (
    <>
      <HeaderComponent backVisible={false} pageName={"프로필"} optType={1}></HeaderComponent>
      <div className="profile-page">
        <img className="user-profile-img" src={userImg}></img>
        <div className="user-info-container">
          <div className="user-social-info-box">
            <ul className="user-social-info-title">{userInfoNameList}</ul>
            <ul className="user-social-info">{userInfoList}</ul>
          </div>
        </div>
        <div className="profile-tab-menu">
          <ul className="tab-menus">
            <li className="post-menu">포스트</li>
            <li className="book-menu">북마크</li>
          </ul>
        </div>
        <div className="feed-container">{postList}</div>
      </div>
    </>
  );
};

export default ProfilePage;
