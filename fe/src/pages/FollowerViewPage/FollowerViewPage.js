/* import react */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFollowerList, getFollowingList, getOtherFollowerList, getOtherFollowingList } from "../../api/FollowAPI";

/* import img */
import userImg from "../../assets/DummyData/dummy-sample.jpg";

/* import component */
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import UserInfoItem from "./UserInfoItem/UserInfoItem";

/* import module */
import { getMemberInfo, getOtherMemberInfo } from "../../api/MemberAPI";

/* import css */
import "./FollowerViewPage.css";
import { setUser } from "../../redux/user";

const FollowerViewPage = () => {
  const param = useParams();
  const [userInfoList, setUserInfoList] = useState([<></>]);
  const [userInfo, setUserInfo] = useState({ nickname: "" });
  const [isFocus, setIsFocus] = useState(Number(param.acc) === 0 ? true : false);
  const [followerList, setFollowerList] = useState([<></>]);
  const [followingList, setFollowingList] = useState([<></>]);

  // 현재 로그인한 사람의 정보
  const user = useSelector((state) => state.user.userData);

  // 내 팔로워/팔로잉 정보 가져오는 메서드
  const setFollowerJSXList = async () => {
    await getFollowerList()
      .then((res) => {
        setUserInfoList(res.map((u) => <UserInfoItem userInfo={u} isFollow={param.acc === 0}></UserInfoItem>));
      })
      .catch((err) => {});
  };

  const setFollowingJSXList = async () => {
    await getFollowingList()
      .then((res) => {
        setUserInfoList(res.map((u) => <UserInfoItem userInfo={u} isFollow={param.acc !== 0}></UserInfoItem>));
      })
      .catch((err) => {});
  };

  const getFolllowerInfoList = async (id, acc) => {
    if (id == user.id) {
      console.log("아이디가 같습니다.");
      setUserInfo(user);
      // 팔로워로 왔는지 팔로잉으로 왔는지에 따라 분기
      console.log(acc);
      switch (Number(acc)) {
        case 0: //  팔로워
          setFollowerJSXList();
          break;
        case 1: // 팔로잉
          setFollowingJSXList();
          break;
        default:
          setUserInfoList(<></>);
          break;
      }
    } else {
      // 여기에서 별도 로직 필요
      console.log("다른사람 페이지 입니다.");
      let otherData = getOtherMemberInfo(param.id);
      otherData.then((res) => {
        setUserInfo(res);
        let followerData = getOtherFollowerList();
        followerData.then((res) => {
          console.dir(res);
        });

        let followingData = getOtherFollowingList();
        followingData.then((res) => {
          console.dir(res);
        });
      });
    }
  };

  let n = 8;
  useEffect(() => {
    getFolllowerInfoList(param.id, param.acc);
    // setUserInfoList([...Array(5)].map((e, i) => <UserInfoItem></UserInfoItem>));
  }, []);
  return (
    <>
      <HeaderComponent backVisible={true} pageName={userInfo.nickname}></HeaderComponent>
      <div className="follower-view-container">
        <div className="follower-view-nav">
          <div
            className={`follower-nav-btn ${isFocus ? "focus-tab" : ""}`}
            onClick={(e) => {
              setIsFocus(true);
              setFollowerJSXList();
            }}
          >
            <p>팔로워</p>
          </div>
          <div
            className={`follower-nav-btn ${isFocus ? "" : "focus-tab"}`}
            onClick={(e) => {
              setIsFocus(false);
              setFollowingJSXList();
            }}
          >
            <p>팔로잉</p>
          </div>
        </div>
        <div className="follower-info-container">{userInfoList}</div>
      </div>
    </>
  );
};

export default FollowerViewPage;
