import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../../../api/PostAPI";
import {
  getCommentList,
  createComment,
  commentApprove,
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

/* css import */
import "./PostDetailPage.css";

const PostDetailPage = () => {
  const params = useParams();
  const url = "https://i8b210.p.ssafy.io/api/file/";

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInputValue, setCommentInputValue] = useState("");

  const [postLoading, setPostLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  // const [isImg, setIsImg] = useState(false);

  const handleCommentInputValue = (e) => {
    setCommentInputValue(e.target.value);
    // console.log(commentInputValue);
  };

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
    commentInput();
  }, []);

  /**
   * 댓글의 공감을 채택하는 함수
   * @param {*} id
   */
  const AdoptComment = (id) => {
    console.log(id);
    commentApprove(id).then((response) => {
      console.log(response);
    });
  };

  /**
   * 댓글을 입력하는 함수
   * @param {*} postId
   */
  const commentInput = (postId, parentId, primitiveId) => {
    console.log(commentInputValue);
    // console.log(postId);
    createComment(commentInputValue, parentId, postId, primitiveId).then(
      (response) => {
        console.log(response);
      }
    );
  };

  // 가져온 리스트를 이제 화면에 띄우면 된다.
  if (postLoading && commentLoading) {
    let postDay = dayjs(post.regDate, "YYYY-MM-DD HH:mm:ss");
    let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
    let RegBefore = getTimeDiffText(postDay, curDay);

    const tags = post.relation.tagList.map(({ key, tagName }) => (
      <div className="post-tag">
        {key}
        {tagName}
      </div>
    ));
    console.log(comments);
    console.log(post);

    const commentList = comments.map((e) => {
      let commentKey = e.key;
      let commentDay = dayjs(e.createdAt, "YYYY-MM-DD HH:mm:ss");
      let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
      let RegBefore = getTimeDiffText(commentDay, curDay);
      // setIsImg(e.isApprove);
      const result = (
        <div className="comment-item">
          <img
            className="user-img"
            src={`${url}${e.writer.profileImage.saveName}`}
          />
          <div className="comment-container">
            <div className="comment-header">
              <p>{e.writer.nickname}</p>
              <p>{RegBefore}</p>
            </div>
            <div className="comment-main">{e.content}</div>
          </div>
          <img
            className="check-btn"
            onClick={() =>
              AdoptComment(e.id, e.parentId, e.postId, e.primitiveId)
            }
            src={e.isApprove ? sunnyActivate : sunnyDeActivate}
          />
        </div>
      );
      return result;
    });

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
                  <img src={`${url}${post.writer.profileImage.saveName}`} />
                  <div className="text-div">
                    <p className="user-name">{post.writer.nickname}</p>
                    <p className="time-log">{RegBefore} ☀️</p>
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
              src={`${url}${post.writer.profileImage.saveName}`}
            />
            <div className="comment-input-div">
              <input
                className="comment-input"
                value={commentInputValue}
                onChange={handleCommentInputValue}
              />
              <button
                style={{ backgroundImage: `url(${sendCommentBtn})` }}
                onClick={() =>
                  // commentInput( post.id, post.parentId, post.primitiveId)
                  commentInput(post.id, 0, 0, 0)
                }
              ></button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PostDetailPage;
