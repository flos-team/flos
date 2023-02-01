import React from "react";
import { useState } from "react";
import PostItem from "../../components/PostItem";
import styles from "./GlobalPage.module.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

function Feed() {
  const [userInfos, setUserInfos] = useState([
    { userInfoId: 1, userInfo: 999 },
    { userInfoId: 2, userInfo: 999 },
    { userInfoId: 3, userInfo: 999 },
    { userInfoId: 4, userInfo: 999 },
    { userInfoId: 5, userInfo: 999 },
  ]);
  const postList = userInfos.map(({ userInfoId, userInfo }) => (
    <PostItem mood={"RAINY"} userName={"wonnny"}></PostItem>
  ));


  return (
    <div className={styles.feedRoot}>
      <HeaderComponent pageName={"둘러보기"} optType={0}></HeaderComponent>
      <div className={styles.main}>
        {/** 친구들의 포스트를 나열한다.  */}
        {postList}
      </div>
    </div>
  );
}

export default Feed;
