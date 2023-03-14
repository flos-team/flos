/* import react */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollowingIdList } from "../../../redux/user";

/* import img */
import userImg from "../../../assets/DummyData/dummy-sample.jpg";

/* import component */
import Swal from "sweetalert2";

/* import module */
import { getFollowingList, getOtherFollowingList, cancelFollowing, doFollowing } from "../../../api/FollowAPI";

/* import css */
import "./UserInfoItem.css";

const UserInfoItem = ({ userInfo, paramId }) => {
  const user = useSelector((state) => state.user.userData);
  const userIdList = useSelector((state) => state.user.followingIdList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleFactor, setToggleFactor] = useState(true);
  const [followText, setFollowText] = useState("팔로잉");

  // 팔로잉/팔로우 성공시 swal 창
  const showSuccess = (text) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${text} 되었습니다.`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  // 팔로잉/팔로우 오류 시 swal 창
  const showError = (text) => {
    Swal.fire({
      icon: "error",
      title: "오류 발생",
      text: `${text} 요청 중 오류가 발생했어요`,
      footer: "잠시 후 다시 시도해주세요",
    });
  };

  useEffect(() => {
    let isFollowed = false;
    // console.log(userIdList);
    // console.log(userInfo.id);
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

  const moveOtherProfile = () => {
    if (userInfo.id !== paramId && userInfo.id !== user.id) {
      navigate(`/other-profile-page/${userInfo.id}`);
    }
  };

  const toggleFunction = () => {
    // 팔로잉 관련 로직
    // true -> 팔로잉, 팔로우 한 상태
    // false -> 팔로우, 팔로우 안한 상태
    if (toggleFactor) {
      setFollowText("팔로우");
      let data = cancelFollowing(userInfo.id);
      data.then((res) => {
        if (res) {
          // alert("팔로잉 취소 성공");
          let newList = userIdList.filter((id) => userInfo.id !== id);
          // console.log(newList);
          dispatch(setFollowingIdList(newList));
          showSuccess("팔로우 취소");
        } else {
          console.log("서버로 부터 응답 받음 그러나 문제 발생");
          console.dir(res);
          showError("팔로우 취소");
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
          // console.log(newList);
          dispatch(setFollowingIdList(newList));
          showSuccess("팔로우");
        } else {
          console.log("서버로 부터 응답 받음 그러나 문제 발생");
          console.dir(res);
          showError("팔로우");
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
        style={{ backgroundImage: `url(${`********/${userInfo.profileImage.saveName}`})` }}
        onClick={(e) => {
          moveOtherProfile();
        }}
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
