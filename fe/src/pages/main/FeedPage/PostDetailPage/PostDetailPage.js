import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../../../api/PostAPI";
import { getCommentList } from "../../../../api/CommentAPI";

import { getTimeDiffText } from "../../../../api/DateModule";

import dayjs from "dayjs";

/* img import */
import writerProfileSample from "../../../../assets/DummyData/writerProfileSample.png";
import commentProfileSample from "../../../../assets/DummyData/commentProfileSample.png";
import sunnyActivate from "../../../../assets/GlobalAsset/sunny-activate.png";
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
      console.log(comments)
    const commentList = comments.map(({ writer, createdAt, content }) => (
      <div className="comment-item">
        <img className="user-img" src={writer.profileImage} />
        <div className="comment-container">
          <div className="comment-header">
            <p>{writer.nickname}</p>
            <p>{createdAt}</p>
          </div>
          <div className="comment-main">{content}</div>
        </div>
        <img className="check-btn" src={sunnyActivate} />
      </div>
    ));

    // console.log(post);
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
                  <img src={post.writer.picture} />
                  <div className="text-div">
                    <p className="user-name">{post.writer.nickname}</p>
                    <p className="time-log">{RegBefore} ☀️</p>
                  </div>
                </div>
              </div>
              <div
                className="img-container"
                style={{ backgroundImage: `url(${writerProfileSample})` }}
              ></div>
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
            <img className="user-icon" src={writerProfileSample} />
            <div className="comment-input-div">
              <input className="comment-input" />
              <button
                style={{ backgroundImage: `url(${sendCommentBtn})` }}
              ></button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PostDetailPage;
