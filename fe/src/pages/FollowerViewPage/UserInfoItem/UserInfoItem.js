/* import react */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


/* import img */
import userImg from "../../../assets/DummyData/dummy-sample.jpg";

/* import component */

/* import module */
import { getFollowingList, getOtherFollowingList, cancelFollowing, doFollowing} from "../../../api/FollowAPI"


/* import css */
import "./UserInfoItem.css";

const UserInfoItem = ({ userInfo, isFollow }) => {
  const user = useSelector((state) => state.user.userData);

  const [toggleFactor, setToggleFactor] = useState(isFollow);
  const [followBtnStyle, setFollowBtnStyle] = useState("follow-btn");
  const [followText, setFollowText] = useState("팔로우");
  const [myFollowList, setMyFollowList] = useState(false);

  useEffect(() => {
  },[])


  const toggleFunction = () => {
    // 팔로잉 관련 로직
    // true -> 팔로잉, 팔로우 한 상태
    // false -> 팔로우, 팔로우 안한 상태
    if (toggleFactor) { 
      setFollowBtnStyle("followed-btn");
      setFollowText("팔로잉");
      let data = cancelFollowing(userInfo.id);
      data.then((res) => {
        if (res) alert("팔로잉 취소 성공");
      });
    } else {
      setFollowBtnStyle("follow-btn");
      setFollowText("팔로우");
      let data = doFollowing(userInfo.id);
      data.then((res) => {
        if (res) alert("팔로잉 성공");
      });      
    }
    setToggleFactor(!toggleFactor);
  };
  return (
    // userInfo.profileImage.saveName
    <div className="user-info-item" key={userInfo.id}>
      <div className="user-img" style={{ backgroundImage: `url(${`https://i8b210.p.ssafy.io/api/file/${userInfo.profileImage.saveName}`})` }}></div>
      <div className="follower-info-div">
        <div className="user-nickname">
          <p>{userInfo.nickname}</p>
        </div>
        <div className="user-introduce-text">
          <p>{userInfo.introduction}</p>
        </div>
      </div>
      <div 
        className={toggleFactor?"followed-btn":"follow-btn"}
        onClick={(e) => {
          toggleFunction();
        }}
      >
        <p>{toggleFactor?"팔로잉":"팔로우"}</p>
      </div>

    </div>
  );
};

UserInfoItem.defaultProps = {
  userInfo: {
    email: "",
    id: "",
    introduction: "",
    nickname: "",
    profileImage: {
      saveName:"",
    }
  },
}


export default UserInfoItem;
