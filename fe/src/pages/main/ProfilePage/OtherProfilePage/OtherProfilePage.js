/* import react */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import img */
import userImg from "../../../../assets/DummyData/dummy-sample.jpg"

/* import component */
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../../components/PostItem/PostItem";

/* import css */
import "./OtherProfilePage.css";

const OtherProfilePage = ({ userNickName }) => {
  // 사용자 정보를 임시로 더미데이터로 맵핑...
  const titles = ["팔로잉", "팔로우", "게시글", "꽃송이"];
  const titleList = titles.map((e, i) => <li key={i}>{e}</li>);
  const userInfos = [1000, 1000, 1000, 1000];
  const userInfoList = userInfos.map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>);
  const tempPostList = [...Array(8)].map((e, i) => (
    <PostItem
      key={i}
      postId={i}
      writerNickname={"김채원"}
      weather={"SUNNY"}
      regDate={new Date()}
      content={"안녕하세요 르세라핌 김채원입니다."}
    ></PostItem>
  ));

  const [toggleFactor, setToggleFactor] = useState(false);
  const [followBtnStyle, setFollowBtnStyle] = useState("following-btn");
  const [followText, setFollowText] = useState("팔로우");
  const toggleFunction = () => {
    setToggleFactor(!toggleFactor);
    if (toggleFactor) {
      setFollowBtnStyle("followed-btn");
      setFollowText("팔로잉");
    } else {
      setFollowBtnStyle("following-btn");
      setFollowText("팔로우");
    }
  };

  return (
    <>
      <HeaderComponent backVisible={true} pageName={userNickName}></HeaderComponent>
      <div className="other-profile-page hide-scroll">
        <div className="user-info-header">
          <div className="user-img" style={{ backgroundImage: `url(${userImg})` }}></div>
        </div>
        <div className="user-introduce-container">
          <div className="user-introduce-text">
            <p>안녕하세요 김채원 입니다.</p>
          </div>
          <div className={followBtnStyle} onClick={toggleFunction}>
            <p>{followText}</p>
          </div>
        </div>
        <div className="user-social-info-box">
          <ul className="social-info-title">{titleList}</ul>
          <ul className="social-info-count">{userInfoList}</ul>
        </div>
        <div className="post-container hide-scroll">{tempPostList}</div>
      </div>
    </>
  );
};

export default OtherProfilePage;
