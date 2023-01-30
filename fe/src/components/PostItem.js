
import {useState} from "react";

/* img src import */
import userImg from "../../src/assets/GlobalAsset/user-img.png";
import sunnyImg from "../../src/assets/GlobalAsset/sunny.png";
import cloudyImg from "../../src/assets/GlobalAsset/cloudy.png";
import rainyImg from "../../src/assets/GlobalAsset/rainy.png"
import bookMarkBtn from "../../src/assets/GlobalAsset/book-mark-btn.png";
import postOpsBtn from "../../src/assets/GlobalAsset/post-ops-btn.png";
import pha from "../../src/assets/GlobalAsset/pha.png";
import speechBubble from "../../src/assets/GlobalAsset/speech-bubble.png";

/* color.js */
import {COLORS} from "../styles/colors";


/* css import */
import "./PostItem.css";

const PostItem = ({mood, userName}) => {
  let postTime = "1시간 전";
  // 감정 아이템 채택 수?
  const moodCount = 123;
  const moodCountText = <p>{moodCount >= 99 ? "99+" : moodCount}</p>;
  // 댓글 수
  const commentCount = 123;
  const commentCountText = <p>{commentCount >= 99 ? "99+" : commentCount}</p>;

  let indiStyles = null;
  let moodImg = null;
  switch (mood) {
    case "SUNNY":
      indiStyles = {
        backgroundColor: COLORS.yellowP,
      }
      moodImg = sunnyImg;
      break;
    case "CLOUDY":
      indiStyles = {
        backgroundColor: COLORS.mono400,
      }
      moodImg = cloudyImg;
      break;
    case "RAINY":
      indiStyles = {
        backgroundColor: COLORS.blueP,
      }
      moodImg = rainyImg;
      break;
    default:
      break;
  }

    return(<>    
    <div className="post-item">
      <div className="post-header">
        <div className="mood-indicator" style={indiStyles}></div>
        <div className="post-head-container">
          <div className="post-info-div">
            <img className="user-img" src={userImg} />
            <div className="post-info">
              <p className="user-nickname">{userName}</p>
              <div className="post-time-line">
                <p className="post-time">{postTime}</p>
                <img className="post-status" src={moodImg} />
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
            <img className="mood-img" src={moodImg} />
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