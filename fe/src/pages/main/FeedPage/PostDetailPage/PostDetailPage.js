import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getTimeDiffText } from "../../../../api/DateModule";
import { getPost } from "../../../../api/PostAPI";
import { getCommentList, createComment } from "../../../../api/CommentAPI";
import { setBookMark, deleteBookMark } from "../../../../api/BookmarkAPI";

import CommentComponent from "./CommentComponent";

import dayjs from "dayjs";

// https://www.npmjs.com/package/react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import sendCommentBtn from "../../../../assets/GlobalAsset/send-comment-btn.png";
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
import bookMarkIcon from "../../../../assets/GlobalAsset/book-mark-icon.png";
import bookMarkActive from "../../../../assets/GlobalAsset/book-mark-active.png";
import dotMarkIcon from "../../../../assets/GlobalAsset/dot-mark-icon.png";
import PostEditModal from "../../../../components/PostEditModal/PostEditModal";

import rainy from "../../../../assets/GlobalAsset/rainy.png";
import sunny from "../../../../assets/GlobalAsset/sunny.png";
import cloud from "../../../../assets/GlobalAsset/cloudy.png";
import none from "../../../../assets/ProfileAsset/question-mark.png";

/* css import */
import "./PostDetailPage.css";

const PostDetailPage = () => {
  const user = useSelector((state) => state.user.userData);
  const params = useParams();
  const url = "https://i8b210.p.ssafy.io/api/file/";

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentOnChange, setCommentOnChange] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [postLoading, setPostLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  // 북마크 토글에 대한 state 및 function
  const [isBookmark, setIsBookmark] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const handleCommentInputValue = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    getPost(params.id).then((response) => {
      setPost(response);
      setPostLoading(true);
    });
  }, [isBookmark]);

  useEffect(() => {
    getCommentList(params.id).then((response) => {
      setComments(response);
      setCommentLoading(true);
    });
  }, [commentOnChange]);

  // useEffect(() => {

  // }, [isBookmark]);

  if (postLoading && commentLoading) {
    // console.log(comments);
    console.log(post);
    const commentList = comments.map((key) => {
      return (
        <>
          <CommentComponent
            comment={key}
            postWriterId={post.writer.id}
          ></CommentComponent>
        </>
      );
    });

    // 게시글의 weather Enum 값을 읽어 이미지로 변환하는 분기
    let emotionWeather = none;
    switch (post.weather) {
      case "SUNNY":
        emotionWeather = sunny;
        break;
      case "RAINY":
        emotionWeather = rainy;
        break;
      case "CLOUDY":
        emotionWeather = cloud;
        break;
      default:
        emotionWeather = none;
        break;
    }

    let postDay = dayjs(post.regDate, "YYYY-MM-DD HH:mm:ss");
    let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
    let RegBefore = getTimeDiffText(postDay, curDay);

    // 게시물에 저장된 해시태그 출력
    const tags = post.relation.tagList.map((key) => {
      return <div className="post-tag">{key}</div>;
    });

    // 사진 영역 : 사진이 있으면 사진들을 화면 에 출력한다.
    let imgs = "";
    if (post.relation.attachFiles.length >= 1) {
      imgs = post.relation.attachFiles.map(({ key, saveName }) => (
        <div id={key}>
          <img src={`${url}${saveName}`}></img>
        </div>
      ));
      imgs = (
        <Carousel showThumbs={true} thumbWidth={50}>
          {imgs}
        </Carousel>
      );
    }

    return (
      <>
        <div className="post-detail-page">
          <HeaderComponent
            backVisible={true}
            pageName={"피드"}
            optType={0}
          ></HeaderComponent>
          <div className="post-detail-container">
            <div className="post-container">
              <div className="user-info-container">
                <div className="user-info-div">
                  <img
                    src={`${url}${post.writer.profileImage.saveName}`}
                    onClick={(e) => {
                      if (post.writer.id !== user.id) {
                        navigate(`/other-profile-page/${post.writer.id}`);
                      }
                    }}
                  />
                  <div className="text-div">
                    <p className="user-name">{post.writer.nickname}</p>
                    <p className="time-log">
                      {RegBefore}{" "}
                      <img className="post-emotion" src={emotionWeather}></img>
                    </p>
                  </div>
                </div>
                <div
                  className="bookmark-btn"
                  onClick={(e) => {
                    // setIsBookmark(!isBookmark);
                    if (!post.relation.bookmarked) {
                      console.log("post id : " , post.id)
                      setBookMark(post.id).then((response) => {
                        console.log(response)
                        setIsBookmark(response);
                      });
                    } else {
                      deleteBookMark(post.id).then((response) => {
                        setIsBookmark(response);
                      });
                    }
                  }}
                >
                  <img
                    src={
                      post.relation.bookmarked ? bookMarkActive : bookMarkIcon
                    }
                  />
                </div>
                <div className="dot-btn">
                  <img src={dotMarkIcon} onClick={() =>{
                    setOpenModal(true)
                    // console.log(openModal)
                    // console.log(post)
                  }} />
                  {openModal ? <PostEditModal postId={post.id}/> : null}
                </div>
              </div>
              {imgs}
              <div className="post-content-container">
                <div className="post-text-div">{post.content}</div>
                <div className="post-tag-container">{tags ? tags : ""}</div>
              </div>
            </div>
            <div className="comment-container">
              <div className="comment-title-div">댓글</div>
              {commentList}
            </div>
          </div>
          <div className="user-content-input-div">
            <img
              className="user-icon"
              src={`${url}${user.profileImage.saveName}`}
            />
            <div className="comment-input-div">
              <input
                className="comment-input"
                value={inputValue}
                onChange={handleCommentInputValue}
                onKeyDown={(e) => {
                  if (e.key == "Enter" && inputValue) {
                    createComment(inputValue, post.id).then(() => {
                      setCommentOnChange(!commentOnChange);
                      setInputValue("");
                    });
                  }
                }}
              />
              <button
                style={{ backgroundImage: `url(${sendCommentBtn})` }}
                onClick={() => {
                  if (inputValue) {
                    createComment(inputValue, post.id).then(() => {
                      setCommentOnChange(!commentOnChange);
                      setInputValue("");
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PostDetailPage;
