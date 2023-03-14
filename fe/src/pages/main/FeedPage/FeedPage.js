import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getFollowerPostList } from "../../../api/PostAPI";
import { getFollowingList } from "../../../api/FollowAPI";

import PostItem from "../../../components/PostItem/PostItem";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import MoveToTopToggle from "../../../components/MoveToTop/MoveToTopToggle.js";

//import styles from "./FeedPage.module.css";
import "./FeedPageStyle.css";

function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);

  const [friends, setFriends] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isFriendsLoading, SetFriendsLoading] = useState(false);

  const [nextPage, setNextPage] = useState(0);
  const [hasNext, SetHasNext] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    getFollowerPostList().then((response) => {
      // console.log(response);
      setNextPage(response.nextPage);
      SetHasNext(response.hasNext);
      setPosts(response.content);
      setHasContent(response.hasContent);
      setIsPostsLoading(true);
    }, []);
    getFollowingList().then((response) => {
      setFriends(response);
      SetFriendsLoading(true);
    });
  }, []);

  useEffect(() => {
    // newPost가 새로 갱신되면
    // posts에 newPosts를 붙힌다.
    if (newPosts) {
      setPosts([...posts, ...newPosts]);
    }
  }, [newPosts]);

  // console.log(posts);

  const handleScroll = (e) => {
    const isEnd =
      e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight;
    if (isEnd) {
      // console.log("스크롤 끝 감지");
      getFollowerPostList(nextPage).then((response) => {
        setNextPage(response.nextPage);
        SetHasNext(response.hasNext);
        setNewPosts(response.content);
        setHasContent(response.hasContent);
        setIsPostsLoading(true);
      });
    }
  };

  if (isPostsLoading && isFriendsLoading) {
    let postList = "";
    if (posts) {
      postList = posts.map((key) => <PostItem post={key}></PostItem>);
    }

    let friendList = "";
    if (friends) {
      friendList = friends.map((key) => {
        let url =
          "********" + key.profileImage.saveName;
        const result = (
          <div
            className="follower-info-item"
            style={{ backgroundImage: `url(${url})` }}
            onClick={() => {
              navigate(`/other-profile-page/${key.id}`);
            }}
          ></div>
        );
        return result;
      });
    }

    const noPost = <div className="noPost">팔로워 게시물이 없습니다.</div>;
    const noFriend = (
      <div className="">
        팔로우한 사람이 없습니다. <br />
        둘러보기에서 다른 사람들을 검색해보세요!
      </div>
    );

    return (
      <div className="feed-page-container">
        <HeaderComponent pageName={"피드"} optType={0}></HeaderComponent>
        <div className="feed-header-container">
          <div className="following-list-div hide-scroll">
            {/** 친구 프로필을 나열한다.  */}
            {friends.length > 0 ? friendList : noFriend}
          </div>
          <div
            className="post-container hide-scroll"
            id="postMain"
            onScroll={handleScroll}
          >
            {/** 친구들의 포스트를 나열한다.  */}
            {/* {posts.length > 0 ? postList : noPost} */}
            {hasContent ? postList : noPost}
          </div>
          <MoveToTopToggle></MoveToTopToggle>
        </div>
      </div>
    );
  }
}

export default Feed;
