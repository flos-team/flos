import React from "react";
import styles from "./FeedPage.module.css";

function Feed() {
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
        <div className={styles.s}>1</div>
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
