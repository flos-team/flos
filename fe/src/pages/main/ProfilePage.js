import { render } from "@testing-library/react";
// import React from "react";
import { useState } from "react";
/* 컴포넌트에서 사용할 이미지 에셋 import */
import userImg from "../../assets/ProfileAsset/user-img.png";
import sunnyImg from "../../assets/ProfileAsset/sunny-img.png";
import questionMark from "../../assets/ProfileAsset/question-mark.png";
import settingBtn from "../../assets/ProfileAsset/setting-btn.png";
import bookMarkBtn from "../../assets/ProfileAsset/book-mark-btn.png";
import postOpsBtn from "../../assets/ProfileAsset/post-ops-btn.png";
import pha from "../../assets/ProfileAsset/pha.png";
import speechBubble from "../../assets/ProfileAsset/speech-bubble.png";

import HeaderComponent from "../../components/HeaderComponent";

/* Profile Page 전용 CSS import */
import "./ProfilePage.css";

const ProfilePage = () => {
  const userName = "wonny";
  const postTime = "1시간 전";
  const [userInfoNames, setUserInfoNames] = useState([
    { userInfoId: 1, userInfoName: "팔로워" },
    { userInfoId: 2, userInfoName: "팔로잉" },
    { userInfoId: 3, userInfoName: "게시글" },
    { userInfoId: 4, userInfoName: "꽃송이" },
  ]);
  const [userInfos, setUserInfos] = useState([
    { userInfoId: 1, userInfo: 999 },
    { userInfoId: 2, userInfo: 999 },
    { userInfoId: 3, userInfo: 999 },
    { userInfoId: 4, userInfo: 999 },
  ]);
  // 제목
  const userInfoNameList = userInfoNames.map(({ userInfoId, userInfoName }) => (
    <li key={userInfoId}>{userInfoName}</li>
  ));
  // 내용
  const userInfoList = userInfos.map(({ userInfoId, userInfo }) => (
    <li key={userInfoId}>{userInfo >= 999 ? "999+" : userInfo}</li>
  ));
  // 감정 아이템 채택 수?
  const moodCount = 123;
  const moodCountText = <p>{moodCount >= 99 ? "99+" : moodCount}</p>;
  // 댓글 수
  const commentCount = 123;
  const commentCountText = <p>{commentCount >= 99 ? "99+" : commentCount}</p>;

  const postList = userInfos.map(({ userInfoId, userInfo }) => (
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
        <textarea>
          인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에
          만천하의 것이다. 인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 인간이 너의 대중을 밥을 이것이다.
          새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다.인간이 너의 대중을
          밥을 이것이다. 새가 있는 충분히 온갖
        </textarea>
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
  ));
  return (
    <>
      <div className="profile-page">
        <HeaderComponent pageName={"프로필"} optType={1}></HeaderComponent>
        <div className="user-info-header">
          <div className="left">
            <img className="user-profile-img" src={userImg}></img>
          </div>
          <div className="center">
            <p className="user-nickname">wonny</p>
          </div>
          <div className="right">
            <img className="user-today-mood" src={sunnyImg}></img>
          </div>
        </div>
        <div className="user-social-info-box">
          <ul className="user-social-info-title">{userInfoNameList}</ul>
          <ul className="user-social-info">{userInfoList}</ul>
        </div>
        <div className="feed-graph-div">
          <div className="feed-graph-guide-div">
            <p> {userName} 님의 MOOD </p>
            <img className="fi-br-interrogation" src={questionMark}></img>
          </div>
          <div className="user-graph-container">
            <div className="weekend-graph-div">
              <div className="w-sunny sunny"></div>
              <div className="w-cloudy cloudy"></div>
              <div className="w-rainy rainy"></div>
            </div>
            <div className="user-week-text">
              <p>일주일</p>
            </div>
          </div>
          <div className="user-graph-container">
            <div className="month-graph-div">
              <div className="m-sunny sunny"></div>
              <div className="m-cloudy cloudy"></div>
              <div className="m-rainy rainy"></div>
            </div>
            <div className="user-month-text">
              <p>한달</p>
            </div>
          </div>
        </div>
        <div className="profile-tab-menu">
          {/* 임시로 텍스트로 대체함, 추후 nav 태그로 교체 */}
          <ul className="tab-menus">
            <li className="post-menu">포스트</li>
            <li className="book-menu">북마크</li>
          </ul>
        </div>
        <div className="feed-container">
          {postList}
          {/* 
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
              <textarea>
                인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는
                얼음에 만천하의 것이다. 인간이 너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖 인간이 너의 대중을 밥을
                이것이다. 새가 있는 충분히 온갖 광야에서 보이는 끓는 이것을 칼이다. 보이는 얼음에 만천하의 것이다.인간이
                너의 대중을 밥을 이것이다. 새가 있는 충분히 온갖
              </textarea>
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
        */}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
