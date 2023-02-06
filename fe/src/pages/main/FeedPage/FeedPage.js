import React, { useState, useEffect } from "react";
import { getPostList } from "../../../api/PostAPI";

import PostItem from "../../../components/PostItem/PostItem";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import MoveToTopToggle from "../../../components/MoveToTop/MoveToTopToggle.js";

import styles from "./FeedPage.module.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getPostList().then((response) => {
      setPosts(response.postList);
      setIsLoading(true);
    });
  }, []);
  if (isLoading) {
    // console.log(posts);
    const postList = posts.map((EachPost) => <PostItem post={EachPost}></PostItem>);

    const noPost = <div>게시물이 없습니다.</div>;

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
          {posts.length === 0 ? noPost : postList}
        </div>
        <MoveToTopToggle></MoveToTopToggle>
      </div>
    );
  }
}

export default Feed;
