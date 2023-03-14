import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getTimeDiffText } from "../../../../api/DateModule";
import { getPost, deletePost } from "../../../../api/PostAPI";
import { getCommentList, createComment } from "../../../../api/CommentAPI";
import { setBookMark, deleteBookMark } from "../../../../api/BookmarkAPI";

import CommentComponent from "./CommentComponent";
import Swal from "sweetalert2";
import dayjs from "dayjs";

// https://www.npmjs.com/package/react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import sendCommentBtn from "../../../../assets/GlobalAsset/send-comment-btn.png";
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
import bookMarkIcon from "../../../../assets/GlobalAsset/book-mark-icon.png";
import bookMarkActive from "../../../../assets/GlobalAsset/book-mark-active.png";

import rainy from "../../../../assets/GlobalAsset/rainy.png";
import sunny from "../../../../assets/GlobalAsset/sunny.png";
import cloud from "../../../../assets/GlobalAsset/cloudy.png";
import none from "../../../../assets/ProfileAsset/question-mark.png";

/* css import */
import "./PostDetailPage.css";

/* colors */
import COLORS from "../../../../styles/colors";

const PostDetailPage = () => {
  const user = useSelector((state) => state.user.userData);
  const params = useParams();
  const url = "********";

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

  const [headColors, setHeadColors] = useState(COLORS.mono200);

  const setColors = (weather) => {
    switch (weather) {
      case "SUNNY":
        setHeadColors(COLORS.yellow100);
        break;
      case "CLOUDY":
        setHeadColors(COLORS.mono100);
        break;
      case "RAINY":
        setHeadColors(COLORS.skyBlue100);
        break;
      default:
        setHeadColors(COLORS.mono100);
        break;
    }
  };

  useEffect(() => {
    getPost(params.id).then((response) => {
      setColors(response.weather);
      setPost(response);
      setPostLoading(true);
    });
  }, [isBookmark, params.id]);

  useEffect(() => {                     
    // console.log("useEffect");      
    getCommentList(params.id).then((response) => {
      // console.log(response)
      setComments([...response]);
      setCommentLoading(true);
    });
  }, [commentOnChange, params.id]);


  if (postLoading && commentLoading) {
    const commentList = comments.map((key) => {
      return (
        <>
          <CommentComponent
            comment={key}
            postWriterId={post.writer.id}
            weather={post.weather}
            setCommentOnChange = {setCommentOnChange}
            commentOnChange = {commentOnChange}
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
          <img alt="profileImg" src={`${url}${saveName}`}></img>
        </div>
      ));
      imgs = (
        <Carousel showThumbs={true} thumbWidth={50}>
          {imgs}
        </Carousel>
      );
    }

    const clickOutSideCloseModal = () => {
      if (openModal === true) {
        setOpenModal(false);
      }
    };

    const clickDelete = () => {
      Swal.fire({
        title: "해당 게시물을 <br> 삭제하시겠습니까?",
        text: "삭제된 게시물은 되돌릴 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          deletePost(params.id)
            .then((res) => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "글이 삭제되었습니다.",
                showConfirmButton: false,
                timer: 1000,
              });
              navigate(-1);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("삭제 안 함");
        }
      });
    };

    return (
      <>
        <div className="post-detail-page" onClick={clickOutSideCloseModal}>
          <HeaderComponent
            backVisible={true}
            pageName={"피드"}
            optType={0}
          ></HeaderComponent>
          <div className="post-detail-container">
            <div className="post-container">
              <div
                className="user-info-container"
                style={{ background: headColors }}
              >
                <div className="user-info-div">
                  <img
                  alt="profileImg"
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
                      <img alt="emotionWeather" className="post-emotion" src={emotionWeather}></img>
                    </p>
                  </div>
                </div>
                <div
                  className="bookmark-btn"
                  onClick={(e) => {
                    // setIsBookmark(!isBookmark);
                    if (!post.relation.bookmarked) {
                      // console.log("post id : ", post.id);
                      setBookMark(post.id).then((response) => {
                        // console.log(response);
                        setIsBookmark(!isBookmark);
                      });
                    } else {
                      deleteBookMark(post.id).then((response) => {
                        // console.log(response);
                        setIsBookmark(!isBookmark);
                      });
                    }
                  }}
                >
                  <img
                  alt="bookMarkIcon"
                    src={
                      post.relation.bookmarked ? bookMarkActive : bookMarkIcon
                    }
                  />
                </div>
                {post.writer.id === user.id ? (
                  <div className="dot-btn">
                    <p onClick={clickDelete}>삭제</p>
                  </div>
                ) : null}
              </div>
              {imgs}
              <div className="post-content-container">
                <div className="post-text-div">{post.content}</div>
                <div className="post-tag-container">{tags ? tags : ""}</div>
              </div>
            </div>
            <div className="comment-container">
              <div className="comment-title-div">댓글</div>
              {/* 댓글 리스트 렌더링 */}
              {commentList}
            </div>
          </div>
          <div className="user-content-input-div">
            <img
            alt="profileImg"
              className="user-icon"
              src={`${url}${user.profileImage.saveName}`}
            />
            {/* 댓글 입력 부분 */}
            <div className="comment-input-div">
              <input
                className="comment-input"
                value={inputValue}
                onChange={handleCommentInputValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue) {
                    createComment(inputValue, post.id).then(() => {
                      setCommentOnChange(!commentOnChange);
                      setInputValue("");
                    });
                  }
                }}
              />
              {/* 제출 버튼 */}
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
