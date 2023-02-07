/**
 * @author 1-hee, tykimdream
 *
 * @copyright 2023
 */
/* import react */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [imgBaseURL, setImgBaseURL] = useState("https://i8b210.p.ssafy.io/api/file/");
  const [bottomComponent, setBottomComponent] = useState(<PostTextComponent content={post.content?post.content:"게시글 내용이 없습니다."}></PostTextComponent>);
  useEffect(() => {
    if (post !== null) {
      if (post.relation.attachFiles.length) {
        let list = post.relation.attachFiles;
        console.dir(list)
        setBottomComponent(<PostPhotoComponent imgURLList={list}></PostPhotoComponent>)
        // setBottomComponent(<PostPhotoComponent testURL={`${post.writer.profileImage.saveName}`} ></PostPhotoComponent>);
        //console.dir(`${imgBaseURL}${post.writer.profileImage.saveName}`);
      } else {
        // setBottomComponent(<PostPhotoComponent testURL={`${post.writer.profileImage.saveName}`} ></PostPhotoComponent>);
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
      {/* <Link to={`/main/post/${post.id}`}>
        
      </Link> */}
      <div onClick={(e) => { navigate(`/main/post/${post.id}`) }} >      
        {bottomComponent}
      </div>
  </div>)
  }
};

export default PostItem;
