import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../../../api/PostAPI";
import {
  getCommentList,
  getPriComment,
  createComment,
  commentApprove,
  deleteComment,
} from "../../../../api/CommentAPI";

import CommentComponent from "./CommentComponent";
import SubCommentComponent from "./SubCommentComponent";

import { getTimeDiffText } from "../../../../api/DateModule";

import dayjs from "dayjs";

// https://www.npmjs.com/package/react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

/* img import */
import sunnyActivate from "../../../../assets/GlobalAsset/sunny-activate.png";
import sunnyDeActivate from "../../../../assets/GlobalAsset/sunny-deactivate.png";
import sendCommentBtn from "../../../../assets/GlobalAsset/send-comment-btn.png";
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";

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

  const handleCommentInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getPost(params.id).then((response) => {
      setPost(response);
      setPostLoading(true);
    });
  }, []);

  useEffect(() => {
    getCommentList(params.id).then((response) => {
      setComments(response);
      setCommentLoading(true);
    });
  }, [commentOnChange]);

  if (postLoading && commentLoading) {
    // console.log(comments);
    // console.log(post);
    const commentList = comments.map((key) => {
      // console.log(key);
      return (
        <>
          <CommentComponent comment={key}></CommentComponent>
          {key.id ? (
            <SubCommentComponent parentId={key.id}></SubCommentComponent>
          ) : (
            ""
          )}
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
                      navigate(`/other-profile-page/${post.writer.id}`);
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
