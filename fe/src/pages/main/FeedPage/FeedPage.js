import React from "react";
import { useState } from "react";
import PostItem from "../../../components/PostItem/PostItem";
import styles from "./FeedPage.module.css";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import { Link } from "react-router-dom";
import axios from "axios";
// import * as axios from "axios";
/** 게시글 리스트
 * writerProfileImg 작성자 프로필 사진
 * writerNickname 작성자 별명
 * postRegDate 작성 시간
 * postWeather 날씨
 * postContent 내용
 * postPhoto 첨부파일
 * isBookMarked 북마크 여부
 * postWeatherCount 채택된 날씨 수
 * postCommentCount 댓글 수
 * postTag 해시태그
 *
 */

function Feed() {
  console.log(axios.defaults)
  axios.defaults.baseURL = "http://i8b210.p.ssafy.io:8080";
  axios.get("/post/list")
  .then(response => {
  console.log(response)
  }).catch(error => {
    console.log(error)
  })

  // Axios.get("http://i8b210.p.ssafy.io:8080/post/list").then(function (response) {
  //   console.log(response);
  // });

  const [userInfos, setUserInfos] = useState([
    { userInfoId: 1, userInfo: 999, postId: 1 },
    { userInfoId: 2, userInfo: 999, postId: 2 },
    { userInfoId: 3, userInfo: 999, postId: 3 },
    { userInfoId: 4, userInfo: 999, postId: 4 },
    { userInfoId: 5, userInfo: 999, postId: 5 },
  ]);

  const postList = userInfos.map(({ userInfoId, userInfo, postId }) => (
    <PostItem mood={"RAINY"} userName={"wonnny"} postId={postId}></PostItem>
  ));

  return (
    <div className={styles.feedRoot}>
      <HeaderComponent pageName={"피드"} optType={0}></HeaderComponent>
      <div className={styles.friendListBar}>
        {/** 친구 프로필을 나열한다.  */}
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img src="images/commentProfileSample.png" alt="test" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img alt="test" src="images/commentProfileSample.png" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img src="images/commentProfileSample.png" alt="test" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img src="images/commentProfileSample.png" alt="test" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img src="images/commentProfileSample.png" alt="test" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img src="images/commentProfileSample.png" alt="test" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img src="images/commentProfileSample.png" alt="test" className={styles.friendProfileImg}></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img src="images/commentProfileSample.png" alt="test" className={styles.friendProfileImg}></img>
        </div>
      </div>
      <Link to="write">
        <div>write로 가기</div>
      </Link>
      <div className={styles.main}>
        {/** 친구들의 포스트를 나열한다.  */}
        {postList}
      </div>
    </div>
  );
}

export default Feed;
