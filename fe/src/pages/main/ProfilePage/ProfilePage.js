import { render } from "@testing-library/react";

import axios from "axios";

// /* libraray */
// // 날짜 처리를 위한 라이브러리
import dayjs from "dayjs";

/* import react */
import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
/* import react-redux */
import { useSelector, useDispatch } from "react-redux";
import { setIsToastValue } from "../../../redux/toast";

/* import img */

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../components/PostItem/PostItem";
import PostResultModal from "../../../components/PostResultModal/PostResultModal";

/* import module */
import { getTimeDiffText } from "../../../api/DateModule";
import MemberAPI, { getMemberInfo, getOtherMemberInfo, doLogin } from "../../../api/MemberAPI";
import PostAPI, { getPostListByNickname } from "../../../api/PostAPI";

/* import css */
import "./ProfilePage.css";

const ProfilePage = ({ setIsToast }) => {

  let testBtn = <button
  style={{
    width: "160px",
    height: "30px",
    display: "block",
    margin: "0 auto",
  }}
  onClick={async (e) => {
    navigate("/flower-end-page");
  }}
>
  기능테스트
</button>

  // temp, 다른사람 페이지로 이동하는 메서드
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);

  // 사용자가 작성한 포스트의 세팅을 위한 state
  const [postIdx, setPostIdx] = useState(1);
  // 사용자 정보에 따른 포스트 리스트 state
  const [postList, setPostList] = useState([<></>]);
  const [isScrollable, setIsScrollable] = useState(true);

  // 사용자가 작성한 북마크의 세팅을 위한 state
  const [bookPostIdx, setBookPostIdx] = useState(1);
  const [bookPostList, setBookPostList] = useState([]);
  const [isBookScrollable, setIsBookScrollable] = useState(true);

  // 사용자 정보 init
  const titles = ["팔로워", "팔로잉", "게시글", "꽃송이"];
  const titleList = titles.map((e, i) => <li key={i}>{e}</li>);
  const userInfos = [1000, 1000, 1000, 1000];
  const [userInfoList, setUserInfoList] = useState(userInfos.map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>));

  // 사용자 정보를 다루는 state
  const [userInfo, setUserinfo] = useState({});
  // 사용자 이미지 state
  const [userImgURL, setUserImgURL] = useState("");
  // redux-toolkit
  const toastValue = useSelector((state) => state.toast.isToast);
  // 현재 로그인한 사람의 정보
  const dispatch = useDispatch();

  // 화면이 렌딩될 경우 사용자 정보를 요청하고 프로필에 세팅
  useEffect(() => {
    setIsToast(toastValue);
    setUserinfo({
      nickname: user.nickname,
      introduction: user.introduction,
    });
    setUserImgURL(`https://i8b210.p.ssafy.io/api/file/${user.profileImage.saveName}`);
    let list = [user.followerCount, user.followingCount, user.postCount, user.blossomCount];
    setUserInfoList(
      list.map((e, i) => {
        let liEle = <></>;
        if (i <= 1) {
          liEle = (
            <li
              key={i}
              onClick={(e) => {
                navigate(`/follower-view-page/${user.id}`);
              }}
            >
              {e > 999 ? "999+" : e}
            </li>
          );
        } else liEle = <li key={i}>{e > 999 ? "999+" : e}</li>;
        return liEle;
      })
    );
    let myPostList = getPostListByNickname(user.nickname);
    myPostList.then((res) => {
      setPostList(res.content.map((e) => <PostItem post={e}></PostItem>));
    });
  }, []);

  // 스크롤 끝을 감지하는 메서드
  const handleScroll = (e) => {
    const bottom = (e.target.scrollHeight - e.target.scrollTop)+3 <= e.target.clientHeight;
    // console.log(e.target.scrollHeight - e.target.scrollTop);
    // console.log(e.target.clientHeight)
    //console.log("스크롤 감지");
    if (bottom) {
      console.log("스크롤 끝 감지");
      let nextData = getPostListByNickname(user.nickname, postIdx + 1);
      nextData.then((res) => {
        if (res.hasNext) {
          setPostIdx(postIdx + 1);
          let newPostList = postList.concat(res.content.map((e) => <PostItem post={e}></PostItem>));
          setPostList(newPostList);
        } else {
          console.log("불러올 데이터가 없습니다.");
        }
      });
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
      <div className="profile-page-container hide-scroll">
        <div className="user-info-header">
          <div className="user-img" style={{ backgroundImage: `url(${userImgURL})` }}></div>
          <div className="profile-edit-nav-container">
            <Link to="/profile-modify">
              <div className="profile-edit-btn">
                <p>프로필 편집</p>
              </div>
            </Link>
          </div>
          <div className="user-introduce-contanier">
            <p>{userInfo.introduction}</p>
          </div>
        </div>
        <div className="user-social-info-box">
          <ul className="social-info-title">{titleList}</ul>
          <ul className="social-info-count">{userInfoList}</ul>
        </div>        
        <div className="profile-tab-menu">
          <div className="post-tab focus-tab" onClick={(e) => {}}>
            <p>내 포스트</p>
          </div>
          <div
            className="book-tab"
            onClick={(e) => {
              setIsToast(true);
            }}
          >
            <p>북마크</p>
          </div>
        </div>
        <div className="post-container hide-scroll" onScroll={handleScroll}>
          {postList}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
