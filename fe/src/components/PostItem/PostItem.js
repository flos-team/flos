/**
 * @author 1-hee, tykimdream
 *
 * @copyright 2023
 */
/* import react */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
/* import img */

/* import component */
import PostTopComponent from "./PostTopComponent/PostTopComponent";
import PostPhotoComponent from "./PostPhotoComponent/PostPhotoComponent";
import PostTextComponent from "./PostTextComponent/PostTextComponent";

/* color.js */

/* css import */
import "./PostItem.css";

/**
 * @param {Object} post 포스트의 정보를 담은 객체
 */
const PostItem = ({ post }) => {
  /*
    id, content, regDate, relation.tagList, weather, tagList, attachFiles
    writer.id/email/introduction/nickname/profileImage.saveName
    writer.profileImage.saveName
  */
  const [imgBaseURL, setImgBaseURL] = useState("https://i8b210.p.ssafy.io/api/file/");
  const [bottomCompoent, setBottomComponent] = useState(<PostTextComponent content={post.content!==""?post.content:"게시글 내용이 없습니다."}></PostTextComponent>);
  useEffect(() => {
    console.log(post.attachFiles === null ? "없는데?": "있는데");
    if (post !== null) {
      if (post.hasOwnProperty("attachFiles")) {
        // let newImgList = [...post.attachFile.map((e)=>(`${imgBaseURL}/${e}`))];
        // setBottomComponent(<PostPhotoComponent imgURLList={newImgList}></PostPhotoComponent>)
        setBottomComponent(<PostPhotoComponent imgURLList={[`${imgBaseURL}${post.writer.profileImage.saveName}`]} ></PostPhotoComponent>);
      } else {
        setBottomComponent(<PostTextComponent content={post.content ? post.content : "게시글 내용이 없습니다."}></PostTextComponent>);
      }
    }
  }, []);

  // wetaher에 따라서
  if (post) {
    return (<div className="post-item">
    <PostTopComponent
      userImgURL={`${imgBaseURL}${post.writer.profileImage.saveName}`}
      userNickname={post.writer.nickname}
      date={post.regDate}
      weather={post.weather}
      tagList={post.relation.tagList}
    ></PostTopComponent>
    {/* <PostPhotoComponent imgURLList={[`${imgBaseURL}${post.writer.profileImage.saveName}`]} ></PostPhotoComponent> */}
      {/* <PostTextComponent content={post.content}></PostTextComponent> */}
      {bottomCompoent}
  </div>)
  }

};

export default PostItem;
