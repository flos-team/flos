import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../../../api/PostAPI";
import {
  getCommentList,
  createComment,
  commentApprove,
  deleteComment,
} from "../../../../api/CommentAPI";

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
  });

  if (postLoading && commentLoading) {
    // console.log(comments);
    // console.log(post);

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

    // 자신의 댓글 삭제를 누르면 삭제하는 함수
    const commentDeleteBtn = (commentId) => {
      return (
        <div>
          <span
            className="comment-header-right"
            onClick={() => deleteComment(commentId)}
          >
            삭제
          </span>
        </div>
      );
    };

    // 타인의 프로필로 이동하는 함수
    const toProfile = (userId) => {
      navigate(`/other-profile-page/${userId}`);
    };

    // 게시물에 저장된 해시태그 출력
    const tags = post.relation.tagList.map((key) => {
      return <div className="post-tag">{key}</div>;
    });

    // 댓글 화면에 출력
    const commentList = comments.map((e) => {
      let commentKey = e.key;
      let commentDay = dayjs(e.createdAt, "YYYY-MM-DD HH:mm:ss");
      let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
      let RegBefore = getTimeDiffText(commentDay, curDay);
      const result = (
        <div className="comment-item">
          <img
            className="user-img"
            src={`${url}${e.writer.profileImage.saveName}`}
            onClick={() => {
              toProfile(e.writer.id);
            }}
          />
          <div className="comment-container">
            <div className="comment-header">
              <div>
                <span className="comment-header-left">{e.writer.nickname}</span>
                <span className="comment-header-left">{RegBefore}</span>
              </div>
              {!e.isApprove && e.isMine && !e.isCommented
                ? commentDeleteBtn(e.id)
                : ""}
            </div>
            <div className="comment-main">{e.content}</div>
            <div className="comment-addComment">댓글달기</div>
          </div>
          <img
            className="check-btn"
            id="ApproveIcon"
            onClick={() => {
              commentApprove(e.id);
            }}
            src={e.isApprove ? sunnyActivate : sunnyDeActivate}
          />
        </div>
      );
      return result;
    });

    // 사진 영역 : 사진이 있으면 사진들을 화면에 출력한다.
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

    // function Update (props) {
    //   const [content, setContent] = useState(props.setComments)

    //   return (
    //     <>
    //     <form onSubmit={(e) => {
    //         e.preventDefault();
    //         const content = event.taget.content.value
    //         props.onUpdate(content);
    //       }}>
    //       <p><input type="text" name="content" placeholder="댓글을 수정하시오." value={content} onChange={e=>{
    //         setContent(event.target.value)}}></input></p>
    //       <p><input type="submit" alue="Update"></input></p>
    //     </form>
    //     </>
    //   )
    // }

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
              />
              <button
                style={{ backgroundImage: `url(${sendCommentBtn})` }}
                onClick={() => {
                  createComment(inputValue, post.id);
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
