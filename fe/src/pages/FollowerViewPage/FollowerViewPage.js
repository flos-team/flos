/* import react */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {getFollowerList, getFollowingList, getOtherFollowerList, getOtherFollowingList} from "../../api/FollowAPI"


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
  //

  // const handleToggleChange = () => {
  //   setUserInfoList(isFocus ? followingList:followerList);
  // }

  //
  const getFolllowerInfoList = async (id, acc) => {
    if (id == user.id) {
      console.log("아이디가 같습니다.");
      //console.dir(user);
      setUserInfo(user);
      let followerList = [<></>];
      let followingList = [<></>];

      let followerData = getFollowerList();
      await followerData.then((res) => { // array
        console.dir(res);
        followerList = res.map((u) => (<UserInfoItem userInfo={u} isFollow={false}></UserInfoItem>));
        setFollowerList(followerList);
      })
      
      let followingData = getFollowingList();
      await followingData.then((res) => {
        console.dir(res);
        followingList = res.map((u) => (<UserInfoItem userInfo={u} isFollow={true}></UserInfoItem>));
        setFollowingList(followingList);
      })
      // 팔로워로 왔는지 팔로잉으로 왔는지에 따라 분기
      console.log(acc)
      switch (Number(acc)) {
        case 0: //  팔로워
        setUserInfoList(followerList);        
          break;
        case 1: // 팔로잉
        setUserInfoList(followingList);        
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
        })
        
        let followingData = getOtherFollowingList();
        followingData.then((res) => {
          console.dir(res);
        })
        
      })
    }   
  }

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
          <div className={`follower-nav-btn ${isFocus ? "focus-tab" : ""}`} onClick={(e) => {
            setIsFocus(true);
          }}>
            <p>팔로워</p>
          </div>
          <div className={`follower-nav-btn ${isFocus ? "" : "focus-tab"}`} onClick={(e) => {
            setIsFocus(false);
          }}>
            <p>팔로잉</p>
          </div>
        </div>
        <div className="follower-info-container">{isFocus ? followerList: followingList}</div>
      </div>
    </>
  );
};

export default FollowerViewPage;
