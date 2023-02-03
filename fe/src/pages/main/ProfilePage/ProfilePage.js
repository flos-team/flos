import { render } from "@testing-library/react";

import axios from "axios";

/* libraray */
// 날짜 처리를 위한 라이브러리
import dayjs from "dayjs";

// import React from "react";
import { useState, useEffect } from "react";
/* 컴포넌트에서 사용할 이미지 에셋 import */
import userImg from "../../../assets/GlobalAsset/user-img.png";

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../components/PostItem/PostItem";
import UserStatisticsPage from "./UserStatisticsPage/UserStatisticsPage";
import WriteFormComponent from "../../../components/WriteFormComponent/WriteFormComponent";
import PostDetailPage from "../../../components/PostDetailPage/PostDetailPage";

/* Profile Page 전용 CSS import */
import "./ProfilePage.css";

const ProfilePage = () => {
  // const holderStyle1 = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "100vw",
  //   height: "80vh",
  //   transition: ".5s",
  // };

  // const holderStyle2 = {
  //   display: "flex",
  //   // alignItems: "center",
  //   marginTop: "8px",
  //   justifyContent: "center",
  //   width: "100vw",
  //   height: "80vh",
  //   transition: ".5s",
  // };

  let postListData = null;
  let postListHolde = null;

  const getPostFunc = () => {
    axios
      .get("/post/list?page=1")
      .then((response) => {
        postListData = [...response.data.content];
        
      }).then(() => {
        let newPostList = [...postListData].map((e) => {
          let { content, writer, regDate } = e;
          let postDay = dayjs(regDate, "YYYY-MM-DD HH:mm:ss");
          let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
          let text = judgeTimeText(postDay, curDay);
          console.log(text);
          console.dir(e);            
          <PostItem mood={"RAINY"} userName={writer.nickname}
            postText={content}
            postTimeLog={text}>
            
          </PostItem>
          setPostList(newPostList);
        }
        );        
      });
    // console.log(new Date());
  }

  const judgeTimeText = (postDay, curDay) => {
    const milliSeconds = curDay.diff(postDay);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`
    const weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 전`
    const months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 전`
    const years = days / 365
    return `${Math.floor(years)}년 전`
  }

  const [postList, setPostList] = useState([]);

  const loginFunc = () => {
    const loginInfo = {
      email: "onehee@ssafy.com",
      password: "dnjsgml1234",
    };
    axios
      .post("/member/login", loginInfo)
      .then((response) => {
        const accessToken = response.data.atk;
        // console.log(accessToken)
        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
        // console.dir(axios.defaults)
      })
      .then(() => {
        axios
          .get("/member/info",)
          .then((response) => {
            console.dir(response);
            // navigate("/main");
          })
          .catch((error) => {
            console.dir("error : " + error);
            console.dir(axios.defaults);
          });
      })
      .catch((error) => {
        console.dir(error)
        console.dir(axios.defaults);
      });
  };
  useEffect(() => {
    
  }, [postList]);
  

  const userName = "wonny";
  const postTime = "1시간 전";
  let [touchIdx, setTouchIdx] = useState(false);
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
  const testStyle = {
    width: "100vw",
    height: "81.3vh",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "16px",
    overflowY:"scroll"
  }
  const btnStyle = {
    width: "100vw",
    height: "60px",
    display: "flex",
    justifyContent:"center",
    gap: "16px",    
  }
  return (
    <>
      <HeaderComponent
        backVisible={false}
        pageName={"프로필"}
        menuOpt2={"SETTING"}
        menuOpt1={"STATISTICS"}
      ></HeaderComponent>
      <div className="request-div" style={btnStyle}>
        <button style={{ width: "100px", height: "60px"}}
          onClick={loginFunc}>로그인</button>
        <button style={{ width: "100px", height: "60px" }}
        onClick={getPostFunc}>포스트 내놔</button>
      </div>      
      <div className="test-container" style={testStyle}>
        {postList}
      </div>
      {/* <div className="profile-page">
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
      </div> */}
      {/* <PostItem></PostItem> */}
      {/* <div className="holder" style={touchIdx ? holderStyle1 : holderStyle2}>
        <WriteFormComponent holderFunc={setTouchIdx} holdIdx={touchIdx}></WriteFormComponent>
      </div> */}
      {/* <PostDetailPage></PostDetailPage> */}
    </>
  );
};

export default ProfilePage;
