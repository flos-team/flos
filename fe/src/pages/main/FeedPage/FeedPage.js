import React, { useState, useEffect } from "react";
import { getPostList } from "../../../api/PostAPI";
import { getFollowerList } from "../../../api/FollowAPI";

import PostItem from "../../../components/PostItem/PostItem";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import MoveToTopToggle from "../../../components/MoveToTop/MoveToTopToggle.js";

import styles from "./FeedPage.module.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isFriendsLoading, SetFriendsLoading] = useState(false);
  useEffect(() => {
    getPostList().then((response) => {
      setPosts(response.postList);
      setIsPostsLoading(true);
    });
    getFollowerList().then((response) => {
      setFriends(response);
      SetFriendsLoading(true);
    });
  }, []);
  console.log(posts)
  if (isPostsLoading && isFriendsLoading) {
    const postList = posts.map((EachPost) => <PostItem post={EachPost}></PostItem>);

    const friendList = friends.map((EachFriend) => {
      let url = "https://i8b210.p.ssafy.io/api/file/" + EachFriend.profileImage.saveName;
      // console.log(url);
      const result = (
        <div className={`${styles.friendThumbnail}`}>
          <img src={url} alt="test" className={styles.friendProfileImg}></img>
        </div>
      );
      return result;
    });

    const noPost = <div>게시물이 없습니다.</div>;

    return (
      <div className={`${styles.feedRoot} ${styles.scroll}`}>
        <HeaderComponent pageName={"피드"} optType={0}></HeaderComponent>
        <div className={styles.globalroot}>
          <div className={styles.friendListBar}>
            {/** 친구 프로필을 나열한다.  */}
            {friendList}
          </div>
          <div className={`${styles.main} ${styles.scroll}`}>
            {/** 친구들의 포스트를 나열한다.  */}
            {posts.length === 0 ? noPost : postList}
          </div>
          <MoveToTopToggle></MoveToTopToggle>
        </div>
      </div>
    );
  }
}

export default Feed;
