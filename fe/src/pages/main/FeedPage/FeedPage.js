import React, { useState, useEffect } from "react";
import PostItem from "../../../components/PostItem/PostItem";
import styles from "./FeedPage.module.css";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import { Link } from "react-router-dom";
import MoveToTopToggle from "../../../components/MoveToTop/MoveToTopToggle.js";

// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "../../../redux/auth";

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
// let posts = [];
// axios
// .get("/post/list")
//   .then((response) => {
//     // setPosts(response.data.content);
//     // posts.push(response.data.content)
//     // posts =response.data.content
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.log("error : " + error);
//     console.dir(axios.defaults);
//   });

function Feed() {
  axios.defaults.baseURL = "http://i8b210.p.ssafy.io:8080";
  // axios.defaults.baseURL = "http://localhost:8080/";
  axios.defaults.withCredentials = false;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/post/list?page=1")
      .then((response) => {
        setPosts(response.data.content);
      })
      .catch((error) => {
        console.log("error : " + error);
        console.dir(axios.defaults);
      });
  }, []);

  const postList = posts.map(({ id, writer, weather, regDate, content }) => (
    <PostItem
      key={id}
      postId={id}
      writer={writer}
      weather={weather}
      regDate={regDate}
      content={content}
    ></PostItem>
  ));

  return (
    <div className={styles.feedRoot}>
      <HeaderComponent pageName={"피드"} optType={0}></HeaderComponent>
      <div className={styles.friendListBar}>
        {/** 친구 프로필을 나열한다.  */}
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            src="images/commentProfileSample.png"
            alt="test"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            alt="test"
            src="images/commentProfileSample.png"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            src="images/commentProfileSample.png"
            alt="test"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            src="images/commentProfileSample.png"
            alt="test"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            src="images/commentProfileSample.png"
            alt="test"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            src="images/commentProfileSample.png"
            alt="test"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            src="images/commentProfileSample.png"
            alt="test"
            className={styles.friendProfileImg}
          ></img>
        </div>
        <div className={`${styles.friendThumbnail} ${styles.a}`}>
          <img
            src="images/commentProfileSample.png"
            alt="test"
            className={styles.friendProfileImg}
          ></img>
        </div>
      </div>
      <div className={styles.main}>
        {/** 친구들의 포스트를 나열한다.  */}
        {postList}
      </div>
      <MoveToTopToggle></MoveToTopToggle>
    </div>
  );
}

export default Feed;
