/**
 * @author 1-hee, tykimdream
 *
 * @copyright 2023
 */
/* import react */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/* import img */

/* import component */
import PostTopComponent from "./PostTopComponent/PostTopComponent";
import PostPhotoComponent from "./PostPhotoComponent/PostPhotoComponent";
import PostTextComponent from "./PostTextComponent/PostTextComponent";

/* color.js */

/* import module */
import { getOtherMemberInfo } from "../../api/MemberAPI";

/* css import */
import "./PostItem.css";
import { setUser } from "../../redux/user";

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
  const user = useSelector((state) => state.user.userData);
  const [imgBaseURL, setImgBaseURL] = useState("https://i8b210.p.ssafy.io/api/file/");
  const [bottomComponent, setBottomComponent] = useState(
    <PostTextComponent content={post ? post.content : "게시글 내용이 없습니다."}></PostTextComponent>
  );
  const [postUserId, setPostUserId] = useState(-1);
  useEffect(() => {
    if (post !== null) {
      setPostUserId(post.writer.id);
      if (post.relation.attachFiles.length) {
        let list = post.relation.attachFiles;
        //console.dir(list)
        setBottomComponent(<PostPhotoComponent imgURLList={list}></PostPhotoComponent>);

        // setBottomComponent(<PostPhotoComponent testURL={`${post.writer.profileImage.saveName}`} ></PostPhotoComponent>);
        //console.dir(`${imgBaseURL}${post.writer.profileImage.saveName}`);
      } else {
        // setBottomComponent(<PostPhotoComponent testURL={`${post.writer.profileImage.saveName}`} ></PostPhotoComponent>);
        setBottomComponent(
          <PostTextComponent content={post.content ? post.content : "게시글 내용이 없습니다."}></PostTextComponent>
        );
      }
    }
  }, []);

  // wetaher에 따라서
  if (post) {
    return (
      <div className="post-item">
        <PostTopComponent
          userImgURL={`${imgBaseURL}${post.writer.profileImage.saveName}`}
          userNickname={post.writer.nickname}
          date={post.regDate}
          weather={post.weather}
          tagList={post.relation.tagList}
          moveProfile={(e) => {
            if (post.writer.id !== user.id) {
              navigate(`/other-profile-page/${post.writer.id}`);
            }
          }}
        ></PostTopComponent>

        {/* <PostPhotoComponent imgURLList={[`${imgBaseURL}${post.writer.profileImage.saveName}`]} ></PostPhotoComponent> */}
        {/* <PostTextComponent content={post.content}></PostTextComponent> */}
        {/* <Link to={`/main/post/${post.id}`}>
        
      </Link> */}
        <div
          onClick={(e) => {
            navigate(`/main/post/${post.id}`);
          }}
        >
          {bottomComponent}
        </div>
      </div>
    );
  }
};

export default PostItem;
