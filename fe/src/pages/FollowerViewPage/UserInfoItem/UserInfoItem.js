/* import react */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollowingIdList } from "../../../redux/user";

/* import img */
import userImg from "../../../assets/DummyData/dummy-sample.jpg";

/* import component */

/* import module */
import { getFollowingList, getOtherFollowingList, cancelFollowing, doFollowing } from "../../../api/FollowAPI";

/* import css */
import "./UserInfoItem.css";

const UserInfoItem = ({ userInfo }) => {
  const user = useSelector((state) => state.user.userData);
  const userIdList = useSelector((state) => state.user.followingIdList);
  const dispatch = useDispatch();

  const [toggleFactor, setToggleFactor] = useState(true);
  const [followText, setFollowText] = useState("팔로잉");
  const [myFollowingList, setMyFollowingList] = useState([]);

  useEffect(() => {
    let isFollowed = false;

    for (let i = 0; i < userIdList.length; i++) {
      if (userIdList[i] == userInfo.id) {
        isFollowed = true;
        break;
      }
    }
    setToggleFactor(isFollowed);
    setFollowText(isFollowed ? "팔로잉" : "팔로우");
  }, []);

  let followingBtn = (
    <div
      className={toggleFactor ? "followed-btn" : "follow-btn"}
      onClick={(e) => {
        toggleFunction();
      }}
    >
      <p>{followText}</p>
    </div>
  );

  const toggleFunction = () => {
    // 팔로잉 관련 로직
    // true -> 팔로잉, 팔로우 한 상태
    // false -> 팔로우, 팔로우 안한 상태
    if (toggleFactor) {
      setFollowText("팔로우");
      let data = cancelFollowing(userInfo.id);
      data.then((res) => {
        if (res) {
          alert("팔로잉 취소 성공");
          let newList = userIdList.filter((id) => userInfo.id !== id);
          console.log(newList);
          dispatch(setFollowingIdList(newList));
        } else {
          console.log("서버로 부터 응답 받음 그러나 문제 발생");
          console.dir(res);
        }
      });
    } else {
      setFollowText("팔로잉");
      let data = doFollowing(userInfo.id);
      data.then((res) => {
        if (res) {
          //alert("팔로잉 성공");
          // 여기에 팔로잉 성공 시 리덕스 업데이트 로직 필요
          let newList = userIdList.concat(userInfo.id);
          console.log(newList);
          dispatch(setFollowingIdList(newList));
        } else {
          console.log("서버로 부터 응답 받음 그러나 문제 발생");
          console.dir(res);
        }
      });
    }
    setToggleFactor(!toggleFactor);
  };
  return (
    // userInfo.profileImage.saveName
    <div className="user-info-item" key={userInfo.id}>
      <div
        className="user-img"
        style={{ backgroundImage: `url(${`https://i8b210.p.ssafy.io/api/file/${userInfo.profileImage.saveName}`})` }}
      ></div>
      <div className="follower-info-div">
        <div className="user-nickname">
          <p>{userInfo.nickname}</p>
        </div>
        <div className="user-introduce-text">
          <p>{userInfo.introduction}</p>
        </div>
      </div>
      {user.id == userInfo.id ? <></> : followingBtn}
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
      saveName: "",
    },
  },
};

export default UserInfoItem;
