/* import react */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import img */
import userImg from "../../../assets/DummyData/dummy-sample.jpg";

/* import component */

/* import css */
import "./UserInfoItem.css";

const UserInfoItem = ({ key }) => {
  const [toggleFactor, setToggleFactor] = useState(false);
  const [followBtnStyle, setFollowBtnStyle] = useState("follow-btn");
  const [followText, setFollowText] = useState("팔로우");
  const toggleFunction = () => {
    setToggleFactor(!toggleFactor);
    if (toggleFactor) {
      setFollowBtnStyle("followed-btn");
      setFollowText("팔로잉");
    } else {
      setFollowBtnStyle("follow-btn");
      setFollowText("팔로우");
    }
  };
  return (
    <div className="user-info-item" key={key}>
      <div className="user-img" style={{ backgroundImage: `url(${userImg})` }}></div>
      <div className="follower-info-div">
        <div className="user-nickname">
          <p>chaewon_123</p>
        </div>
        <div className="user-introduce-text">
          <p>안녕하세요 르세라핌 김채원입니다.</p>
        </div>
      </div>
      <div
        className={followBtnStyle}
        onClick={(e) => {
          toggleFunction();
        }}
      >
        <p>{followText}</p>
      </div>
    </div>
  );
};

export default UserInfoItem;
