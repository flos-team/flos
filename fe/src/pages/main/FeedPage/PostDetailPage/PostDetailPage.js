import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../../../api/PostAPI";
import { getCommentList } from "../../../../api/CommentAPI";

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

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    getPost(params.id).then((response) => {
      setPost(response);
      setPostLoading(true);
    });
    getCommentList(params.id).then((response) => {
      setComments(response);
      setCommentLoading(true);
    });
  }, []);

  // 가져온 리스트를 이제 화면에 띄우면 된다.
  if (postLoading && commentLoading) {
    let postDay = dayjs(post.regDate, "YYYY-MM-DD HH:mm:ss");
    let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
    let RegBefore = getTimeDiffText(postDay, curDay);

    const tags = post.postRelationDTO.tagList.map(({ key, tagName }) => (
      <div className="post-tag">
        {key}
        {tagName}
      </div>
    ));
    console.log(comments);

    const commentList = comments.map(({ key, writer, createdAt, content }) => {
      let commentKey = key;
      let commentDay = dayjs(createdAt, "YYYY-MM-DD HH:mm:ss");
      let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
      let RegBefore = getTimeDiffText(commentDay, curDay);
      const result = (
        <div className="comment-item">
          <img className="user-img" src={writer.profileImage} />
          <div className="comment-container">
            <div className="comment-header">
              <p>{writer.nickname}</p>
              <p>{RegBefore}</p>
            </div>
            <div className="comment-main">{content}</div>
          </div>
          <img className="check-btn" src={sunnyDeActivate} />
        </div>
      );
      return result;
    });

    console.log(post);
    let imgs = "";
    if (post.postRelationDTO.attachFiles.length >= 1) {
      imgs = post.postRelationDTO.attachFiles.map(({ key, saveName }) => (
        <div id={key}>
          <img src={`https://i8b210.p.ssafy.io/api/file/${saveName}`}></img>
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
          <HeaderComponent backVisible={true} pageName={"피드"} optType={0}></HeaderComponent>
          <div className="post-detail-container">
            <div className="post-container">
              <div className="user-info-container">
                <div className="user-info-div">
                  <img src={post.writer.picture} />
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
            <img className="user-icon" src={post.writer.picture} />
            <div className="comment-input-div">
              <input className="comment-input" />
              <button style={{ backgroundImage: `url(${sendCommentBtn})` }}></button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PostDetailPage;
