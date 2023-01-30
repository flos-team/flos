
import {useState} from "react";

/* img src import */
import userImg from "../../src/assets/GlobalAsset/user-img.png";
import sunnyImg from "../../src/assets/GlobalAsset/sunny-img.png";
import bookMarkBtn from "../../src/assets/GlobalAsset/book-mark-btn.png";
import postOpsBtn from "../../src/assets/GlobalAsset/post-ops-btn.png";
import pha from "../../src/assets/GlobalAsset/pha.png";
import speechBubble from "../../src/assets/GlobalAsset/speech-bubble.png";


/* css import */
import "./PostItem.css";

const PostItem = () => {
  let userName = "김지환";
  let postTime = "1시간 전";
  // 감정 아이템 채택 수?
  const moodCount = 123;
  const moodCountText = <p>{moodCount >= 99 ? "99+" : moodCount}</p>;
  // 댓글 수
  const commentCount = 123;
  const commentCountText = <p>{commentCount >= 99 ? "99+" : commentCount}</p>;
    return(<>    
    <div className="post-item">
      <div className="post-header">
        <div className="mood-indicator"></div>
        <div className="post-head-container">
          <div className="post-info-div">
            <img className="user-img" src={userImg} />
            <div className="post-info">
              <p className="user-nickname">{userName}</p>
              <div className="post-time-line">
                <p className="post-time">{postTime}</p>
                <img className="post-status" src={sunnyImg} />
              </div>
            </div>
          </div>
          <div className="post-btn-div">
            <div className="book-mark-btn">
              <img src={bookMarkBtn}></img>
            </div>
            <div className="post-ops-btn">
              <img src={postOpsBtn}></img>
            </div>
          </div>
        </div>
      </div>
      <div className="post-main">
        <div>
          인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에
          만천하의 것이다. 인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 인간이 너의 대중을 밥을 이것이다.
          새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다.인간이 너의 대중을
          밥을 이것이다. 새가 있는 충분히 온갖
        </div>
        <img src={pha} />
      </div>
      <div className="post-footer">
        <div className="tag-container">
          <div className="tag">갬쉉적</div>
          <div className="tag">햇살</div>
        </div>
        <div className="comment-container">
          <div className="mood-div">
            <img className="mood-img" src={sunnyImg} />
            {moodCountText}
          </div>
          <div className="comment-div">
            <img className="comment-img" src={speechBubble} />
            {commentCountText}
          </div>
        </div>
      </div>
    </div>
    </>
    )
}

export default PostItem;