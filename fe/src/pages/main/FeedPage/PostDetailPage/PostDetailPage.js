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
  const [inputValue, setInputValue] = useState("");

  const [postLoading, setPostLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const handleCommentInputValue = (e) => {
    setInputValue(e.target.value);
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
  },[]);

  if (postLoading && commentLoading) {
    console.log(comments);
    console.log(post);

    let postDay = dayjs(post.regDate, "YYYY-MM-DD HH:mm:ss");
    let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
    let RegBefore = getTimeDiffText(postDay, curDay);

    const tags = post.relation.tagList.map(({ key, tagName }) => (
      <div className="post-tag">
        {key}
        {tagName}
      </div>
    ));

    // 수정 버튼 구현 + 기능 구현
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
          />
          <div className="comment-container">
            <div className="comment-header">
              <div>
                <span className="comment-header-left">{e.writer.nickname}</span>
                <span className="comment-header-left">{RegBefore}</span>
              </div>
              <div>
                <span className="comment-header-right">수정</span>
                <span className="comment-header-right">삭제</span>
              </div>
            </div>
            <div className="comment-main">{e.content}</div>
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
