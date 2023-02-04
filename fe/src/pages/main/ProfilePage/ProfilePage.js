import { render } from "@testing-library/react";

import axios from "axios";

/* libraray */
// 날짜 처리를 위한 라이브러리
import dayjs from "dayjs";

// import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
/* 컴포넌트에서 사용할 이미지 에셋 import */
import userImg from "../../../assets/GlobalAsset/user-img.png";

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../components/PostItem/PostItem";

/* import module */
// import { getPost } from "./AxiosModule";
import { getTimeDiffText } from "../../../api/DateModule";
import MemberAPI, { getMemberInfo, doLogin } from "../../../api/MemberAPI";
import PostAPI, { getPost, getPostList, getBookMarkList, modifyPost, deletePost } from "../../../api/PostAPI";

/* Profile Page 전용 CSS import */
import "./ProfilePage.css";

const ProfilePage = () => {
  const [postIdx, setPostIdx] = useState(1);
  const [postList, setPostList] = useState([]);
  const [isScrollable, setIsScrollable] = useState(true);
  let scRef = useRef(1);
  // 무한 스크롤 함수;
  // const renderPostList = useCallback(
  //   (array) => {
  //     let getPostList = [...array].map((e, i) => {
  //       // console.dir(e);
  //       let { content, writer, regDate } = e;
  //       let postDay = dayjs(regDate, "YYYY-MM-DD HH:mm:ss");
  //       let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
  //       let text = getTimeDiffText(postDay, curDay);
  //       return <PostItem mood={"RAINY"} userName={writer.nickname} postText={content} postTimeLog={text}></PostItem>;
  //     });
  //     let newPostList = postList.concat(getPostList);
  //     setPostList(newPostList);
  //   },
  //   [postList]
  // ); // postList가 바뀌었을 때만 작동!

  // useEffect(() => {
  //   if (isScrollable) {
  //     let data = getPost();
  //     data
  //       .then((response) => {
  //         // console.dir(response);
  //         renderPostList(response);
  //         setPostIdx(postIdx + 1);
  //       })
  //       .catch((e) => {
  //         console.log("에러감지");
  //         alert("불러올 데이터가 없습니다");
  //       });
  //   }
  // }, []);

  // const handleScroll = (e) => {
  //   const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  //   if (bottom && isScrollable) {
  //     console.log("스크롤의 끝 감지");
  //     let data = getPost(postIdx);
  //     data
  //       .then((response) => {
  //         // console.dir(response);
  //         renderPostList(response);
  //         setPostIdx(postIdx + 1);
  //       })
  //       .catch((e) => {
  //         console.log("에러감지");
  //         alert("불러올 데이터가 없습니다");
  //         setIsScrollable(false);
  //       });
  //   }
  // };

  return (
    <>
      <HeaderComponent
        backVisible={false}
        pageName={"프로필"}
        menuOpt2={"SETTING"}
        menuOpt1={"STATISTICS"}
      ></HeaderComponent>
      <div className="request-div" ref={scRef}>
        <button
          style={{ width: "100px", height: "30px" }}
          onClick={(e) => {
            doLogin("onehee@ssafy.com", "dnjsgml1234");
          }}
        >
          로그인
        </button>
        <button style={{ width: "100px", height: "30px" }} onClick={(e) => {}}>
          기능 테스트
        </button>
      </div>
      <div
        className="test-container"
        onScroll={(e) => {
          // handleScroll();
        }}
      >
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
        <div className="profile-tab-menu">newPostList
          <ul className="tab-menus">
            <li className="post-menu">포스트</li>
            <li className="book-menu">북마크</li>
          </ul>
        </div>
        <div className="feed-container">{postList}</div>
      </div> */}
      {/* <PostDetailPage></PostDetailPage> */}
    </>
  );
};

export default ProfilePage;
