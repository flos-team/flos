import React from "react";
import { useState } from "react";
import PostItem from "../../../components/PostItem";
import styles from "./FeedPage.module.css";
import HeaderComponent from "../../../components/HeaderComponent";
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
const dataInfo = [
  {
    writerProfileImg: "../../assets/DummyData/writerProfileSample.png",
    writerNickname: "jh",
    postRegDate: "2022.12.20",
    postWeather: "sunny",
    postContent:
      "인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의",
    postPhoto: "../../assets/DummyData/postPhotoSample.PNG",
    isBookMarked: "true",
    postWeatherCount: "99",
    postCommentCount: "32",
    postTag: "해시태그",
  },
  {
    writerProfileImg: "../../assets/DummyData/writerProfileSample.png",
    writerNickname: "jh",
    postRegDate: "2022.12.20",
    postWeather: "sunny",
    postContent:
      "인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의",
    postPhoto: "",
    isBookMarked: "true",
    postWeatherCount: "99",
    postCommentCount: "32",
    postTag: "해시태그",
  },
  {
    writerProfileImg: "../../assets/DummyData/writerProfileSample.png",
    writerNickname: "jh",
    postRegDate: "2022.12.20",
    postWeather: "sunny",
    postContent:
      "인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의",
    postPhoto: "../../assets/DummyData/postPhotoSample.PNG",
    isBookMarked: "true",
    postWeatherCount: "99",
    postCommentCount: "32",
    postTag: "해시태그",
  },
  {
    writerProfileImg: "../../assets/DummyData/writerProfileSample.png",
    writerNickname: "jh",
    postRegDate: "2022.12.20",
    postWeather: "sunny",
    postContent:
      "인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의",
    postPhoto: "",
    isBookMarked: "true",
    postWeatherCount: "99",
    postCommentCount: "32",
    postTag: "해시태그",
  },
];

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
  const rendering = () => {
    const result = [];
    for (let i = 0; i < dataInfo.length; i++) {
      result.push(<div className={styles}></div>);
    }
  };

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
    </div>
  );
}

export default Feed;
