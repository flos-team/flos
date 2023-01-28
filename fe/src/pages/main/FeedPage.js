import React from "react";
import styles from "./FeedPage.module.css";

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
const DataInfo = [
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
  const rendering = () => {
    const result = [];
    for (let i = 0; i < DataInfo.length; i++) {
      result.push(<div className={styles}></div>);
    }
  };

  return (
    <div className={styles.feedRoot}>
      <div className={styles.topBar}>
        <div className={styles.currentPageText}>피드</div>
        <div className={styles.notificationIcon}></div>
      </div>
      <div className={styles.friendListBar}>
        {/** 친구 프로필을 나열한다.  */}
        <div className={`${styles.friendThumbnail} ${styles.a}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.b}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.c}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.d}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.e}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.e}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.e}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.e}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.e}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.e}`}></div>
        <div className={`${styles.friendThumbnail} ${styles.e}`}></div>
      </div>
      <div className={styles.main}>
        {/** 친구들의 포스트를 나열한다.  */}

        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.bookmarkIcon}></div>
            <div className={styles.menuIcon}></div>
            <div className={styles.UserProfileDiv}>
              <img
                src="images/commentProfileSample.png"
                className={styles.writerProfileImg}
              ></img>
              <div className={styles.postWeatherSunny}>☀️</div>
              <div className={styles.postRegDate}>1시간 전</div>
              <div className={styles.writerNickName}></div>
              {/* <div className={styles.writerProfileImg}> */}
              {/* </div> */}
            </div>
            <div className={styles.sunnyBar}></div>
          </div>
          <div className={styles.postMain}>
            <div className={styles.postContent}>
              인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서
              보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이
              너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는
              끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다. 인간이 너의
            </div>
            <div className={styles.postPhoto}></div>
          </div>
          <div className={styles.postFooter}></div>
        </div>
        <div className={styles.s}>1</div>
        <div className={styles.s}>1</div>
        <div className={styles.s}>1</div>
        <div className={styles.s}>1</div>
        <div className={styles.s}>1</div>
        <div className={styles.s}>1</div>
      </div>
    </div>
  );
}

export default Feed;
