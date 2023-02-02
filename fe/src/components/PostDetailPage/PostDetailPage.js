import { useState } from "react";

/* img import */
import writerProfileSample from "../../assets/DummyData/writerProfileSample.png";
import commentProfileSample from "../../assets/DummyData/commentProfileSample.png";
import sunnyActivate from "../../assets/GlobalAsset/sunny-activate.png";
import sendCommentBtn from "../../assets/GlobalAsset/send-comment-btn.png";

/* css import */
import "./PostDetailPage.css";

const PostDetailPage = () => {
  let commentItem = (
    <div className="comment-item">
      <img className="user-img" src={writerProfileSample} />
      <div className="comment-container">
        <div className="comment-header">
          <p>babdoduk</p>
          <p>34분 전</p>
        </div>
        <div className="comment-main">아주 감명적인 글이네요~</div>
      </div>
      <img className="check-btn" src={sunnyActivate} />
    </div>
  );
  const commentItemList = [...Array(8)].map((e, i) => commentItem);

  return (
    <>
      <div className="post-detail-page">
        <div className="post-detail-container">
          <div className="post-container">
            <div className="user-info-container">
              <div className="user-info-div">
                <img src={commentProfileSample} />
                <div className="text-div">
                  <p className="user-name">olivia</p>
                  <p className="time-log">45분 전 ☀️</p>
                </div>
              </div>
            </div>
            <div className="img-container" style={{ backgroundImage: `url(${writerProfileSample})` }}></div>
            <div className="post-content-container">
              <div className="post-text-div">
                아직도 난 너를 느끼죠 이렇게 우리 지금이 순간도 난 그대가 보여 길가에 덩그러니 놓여진 저 의자 위에도
                밤을 타고 쓸쓸히 춤추는 전 낙엽 위에도 뺨을 스치는 어느 저녁의 그 공기 속에도 길가에 내려앉은 음악속에도
                네가 있어 어떤가요 그대 어떤가요 그대 그대는 지웠을 텐데 어떤가요 그대 우린
                라랄라라라라라라라라라라라라라라라라라라라라라라ㅏ라라라라라라랄
              </div>
              <div className="post-tag-container">
                <div className="post-tag">한둘셋넷다여일여아열한둘셋넷다여일여아열</div>
                <div className="post-tag">HTTP통신</div>
                <div className="post-tag">CORS</div>
                <div className="post-tag">프록시</div>
                <div className="post-tag">프록시</div>
              </div>
            </div>
          </div>
          <div className="comment-container">
            <div className="comment-title-div">댓글</div>
            {commentItemList}
          </div>
        </div>
        <div className="user-content-input-div">
          <img className="user-icon" src={writerProfileSample} />
          <div className="comment-input-div">
            <input className="comment-input" />
            <button style={{ backgroundImage: `url(${sendCommentBtn})` }}></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
