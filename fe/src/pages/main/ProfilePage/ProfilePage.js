import { render } from "@testing-library/react";

import axios from "axios";

// /* libraray */
// // 날짜 처리를 위한 라이브러리
import dayjs from "dayjs";

/* import react */
import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import img */
import userImg from "../../../assets/GlobalAsset/user-img.png";

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../components/PostItem/PostItem";
import PostResultModal from "../../../components/PostResultModal/PostResultModal";

/* import module */
import { getTimeDiffText } from "../../../api/DateModule";
import MemberAPI, { getMemberInfo, doLogin } from "../../../api/MemberAPI";
import PostAPI, { getPost, getPostList } from "../../../api/PostAPI";
import { getFile } from "../../../api/FileAPI";


/* import css */
import "./ProfilePage.css";

const ProfilePage = ({ setIsToast }) => {
  // 사용자가 작성한 포스트의 세팅을 위한 state
  const [postIdx, setPostIdx] = useState(1);
  const [postList, setPostList] = useState([]);
  const [isScrollable, setIsScrollable] = useState(true);

  // 사용자가 작성한 북마크의 세팅을 위한 state
  const [bookPostIdx, setBookPostIdx] = useState(1);
  const [bookPostList, setBookPostList] = useState([]);
  const [isBookScrollable, setIsBookScrollable] = useState(true);

  // 사용자 정보를 임시로 더미데이터로 맵핑...
  const titles = ["팔로잉", "팔로우", "게시글", "꽃송이"];
  const titleList = titles.map((e, i) => <li key={i}>{e}</li>);
  const userInfos = [1000, 1000, 1000, 1000];
  const userInfoList = userInfos.map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>);

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
        // postList = res.postList.map(({ id, content, writer, regDate, weather }) => (
        //   <PostItem
        //     key={id}
        //     postId={id}
        //     content={content}
        //     writerNickname={writer.nickname}
        //     regDate={regDate}
        //     weather={weather}
        //   ></PostItem>
        // ));
        postList = res.map((EachPost) => <PostItem post={EachPost}></PostItem>);
      })
      .catch((err) => {
        setIsScrollable(false);
      });
    return postList;
  };

  // 화면이 렌딩될 경우 사용자 정보를 요청하고 프로필에 세팅
  useEffect(() => {
    doLogin("seongtae@ssafy.com", "tjdxo1234"); // 로그인 구현되면 삭제 필요
    // 사용자 정보 세팅
    setTimeout(() => {
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
        let post = getPost(40);
        post.then((e) => {
          console.dir(e);
        })        
      }, 1000);

    });

    // // 북마크 포스트 요청
    // let PostListProm = requestPostList(1);
    // PostListProm.then((res) => {
    //   setPostList([...res]);
    // }).catch((err) => {
    //   console.log("게시글 불러올 수 없음");
    //   console.dir(err);
    //   // 나중에 여기서 토스트 메세지 띄울 것.
    // });
  }, []);

  // // 포스트 리스트를 추가하여 새롭게 렌더링 하는 메서드
  // const renderPostList = useCallback(
  //   (postIdx) => {
  //     console.log(postIdx);
  //     let PostListProm = requestPostList(postIdx);
  //     PostListProm.then((res) => {
  //       let acceptPostList = [...res];
  //       let newPostList = postList.concat(acceptPostList);
  //       setPostList(newPostList);
  //     }).catch((err) => {
  //       console.log("게시글 불러올 수 없음");
  //       console.dir(err);
  //       // 나중에 여기서 토스트 메세지 띄울 것.
  //       setIsScrollable(false);
  //     });
  //   },
  //   [postList]
  // ); // postList가 바뀌었을 때만 작동!

  // 스크롤 끝을 감지하는 메서드
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom && isScrollable) {
      console.log("스크롤 끝 감지");
      // renderPostList(postIdx + 1);
      setPostIdx(postIdx + 1);
    }
  };

  // temp, 다른사람 페이지로 이동하는 메서드
  const navigate = useNavigate();

  // 글작성 모달 on/off 조정하는 함수
  const [isVisible, setIsVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [testPost, setTestPost] = useState(null);

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
          <div className="user-img" style={{ backgroundImage: `url(${userImg})` }}></div>
          <div className="profile-edit-nav-container">
            <Link to="/profile-modify">
              <div className="profile-edit-btn">
                <p>프로필 편집</p>
              </div>
            </Link>
          </div>
          <div className="user-introduce-contanier">
            <p>{"안녕하세요 Olivia입니다."}</p>
          </div>
        </div>
        <div className="user-social-info-box">
          <ul className="social-info-title">{titleList}</ul>
          <ul className="social-info-count">{userInfoList}</ul>
        </div>
        <button
          style={{
            width: "160px",
            height: "30px",
            display: "block",
            margin: "0 auto",
          }}
          onClick={async (e) => {
            let data = getPost(40);
            let url = "";
            await data.then((res) => {
              url = res.writer.profileImage.saveName;
              setTestPost(res);
              // console.dir(res);
            })
            let baseUrl = "https://i8b210.p.ssafy.io/api/file/";
            //setImgUrl(`${baseUrl}${url}`);
            

        //     let test = getFile();
        // test.then((res) => {
        //   console.dir(res);
        // })
          }}
        >
          기능테스트
        </button>
        <img src={imgUrl} />
        <div className="profile-tab-menu">
          <div
            className="post-tab focus-tab"
            onClick={(e) => {
              navigate("/other-profile-page");
            }}
          >
            <p>내 포스트</p>
          </div>
          <div className="book-tab" onClick={setIsToast}>
            <p>북마크</p>
          </div>
        </div>
        <div className="post-container hide-scroll">
          {isVisible ? <PostResultModal setVisible={setIsVisible}></PostResultModal> : <></>}
          {testPost?<PostItem post={testPost}></PostItem>:<></>}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
