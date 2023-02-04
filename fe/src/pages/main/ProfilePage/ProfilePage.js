import { render } from "@testing-library/react";

import axios from "axios";

// /* libraray */
// // 날짜 처리를 위한 라이브러리
import dayjs from "dayjs";

import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
/* 컴포넌트에서 사용할 이미지 에셋 import */
import userImg from "../../../assets/GlobalAsset/user-img.png";

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../components/PostItem/PostItem";

/* import module */
import { getTimeDiffText } from "../../../api/DateModule";
import MemberAPI, { getMemberInfo, doLogin } from "../../../api/MemberAPI";
import PostAPI, { getPost, getPostList, getBookMarkList, modifyPost, deletePost } from "../../../api/PostAPI";

// /* Profile Page 전용 CSS import */
import "./ProfilePage.css";

const ProfilePage = () => {
  // 사용자가 작성한 포스트의 세팅을 위한 state
  const [postIdx, setPostIdx] = useState(1);
  const [postList, setPostList] = useState([]);
  const [isScrollable, setIsScrollable] = useState(true);

  // 사용자가 작성한 북마크의 세팅을 위한 state
  const [bookPostIdx, setBookPostIdx] = useState(1);
  const [bookPostList, setBookPostList] = useState([]);
  const [isBookScrollable, setIsBookScrollable] = useState(true);

  // 사용자 정보를 임시로 더미데이터로 맵핑...
  const titles = [{ option: "팔로잉" }, { option: "팔로우" }, { option: "게시글" }, { option: "꽃송이" }];
  const titleList = titles.map(({ option }) => <li>{option}</li>);
  const userInfos = [1000, 1000, 1000, 1000];
  const userInfoList = userInfos.map((e) => <li>{e > 999 ? "999+" : e}</li>);

  // 사용자 정보를 다루는 state
  let [userInfo, setUserinfo] = useState({});

  // 포스트 리스트를 불러오는 함수
  const requestPostList = async (pageIdx) => {
    // 포스트 요청
    let postList = <></>;
    let postListProm = getPostList(pageIdx);
    await postListProm
      .then((res) => {
        setPostIdx(pageIdx);
        postList = res.postList.map(({ id, content, writer, regDate, weather }) => (
          <PostItem
            postId={id}
            content={content}
            writerNickname={writer.nickname}
            regDate={regDate}
            weather={weather}
          ></PostItem>
        ));
      })
      .catch((err) => {
        setIsScrollable(false);
      });
    return postList;
  };

  // 화면이 렌딩될 경우 사용자 정보를 요청하고 프로필에 세팅
  useEffect(() => {
    doLogin("onehee@ssafy.com", "dnjsgml1234"); // 로그인 구현되면 삭제 필요
    // 사용자 정보 세팅
    let userData = getMemberInfo();
    userData.then((res) => {
      setUserinfo({
        nickname: res.nickname,
        userProfileInfo: {
          followingNumber: 1000,
          followerNumber: 1000,
          postCount: 1000,
          flowerNumber: 1000,
        },
      });
    });

    // 북마크 포스트 요청
    let PostListProm = requestPostList(1);
    PostListProm.then((res) => {
      setPostList([...res]);
    }).catch((err) => {
      alert("게시글을 불러올 수 없습니다");
      // 나중에 여기서 토스트 메세지 띄울 것.
    });
  }, []);

  // 포스트 리스트를 추가하여 새롭게 렌더링 하는 메서드
  const renderPostList = useCallback(
    (postIdx) => {
      console.log(postIdx);
      let PostListProm = requestPostList(postIdx);
      PostListProm.then((res) => {
        let acceptPostList = [...res];
        let newPostList = postList.concat(acceptPostList);
        setPostList(newPostList);
      }).catch((err) => {
        alert("게시글을 불러올 수 없습니다");
        // 나중에 여기서 토스트 메세지 띄울 것.
        setIsScrollable(false);
      });
    },
    [postList]
  ); // postList가 바뀌었을 때만 작동!

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom && isScrollable) {
      console.log("스크롤 끝 감지");
      renderPostList(postIdx + 1);
      setPostIdx(postIdx + 1);
    }
  };

  return (
    <>
      <HeaderComponent
        backVisible={false}
        pageName={userInfo.nickname}
        menuOpt2={"SETTING"}
        menuOpt1={"STATISTICS"}
      ></HeaderComponent>
      <div className="profile-page">
        <img className="user-profile-img" src={userImg}></img>
        <div className="user-info-container">
          <div className="user-social-info-box">
            <ul className="user-social-info-title">{titleList}</ul>
            <ul className="user-social-info">{userInfoList}</ul>
          </div>
        </div>
        <div className="profile-tab-menu">
          <ul className="tab-menus">
            <li className="post-menu">포스트</li>
            <li className="book-menu">북마크</li>
          </ul>
        </div>
        <div className="feed-container" onScroll={handleScroll}>
          {/* {postList} */}
          <PostItem
            postId={1}
            content={"test"}
            regDate={new Date()}
            tagList={[]}
            weather={""}
            writerNickname={"홍길동"}
          ></PostItem>
        </div>
      </div>
      {/* <PostDetailPage></PostDetailPage> */}
    </>
  );
};

export default ProfilePage;
