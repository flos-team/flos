/* import react */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

/* import img */
import userImg from "../../assets/DummyData/dummy-sample.jpg";

/* import component */
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import UserInfoItem from "./UserInfoItem/UserInfoItem";

/* import module */
import { getOtherMemberInfo } from "../../api/MemberAPI";

/* import css */
import "./FollowerViewPage.css";

const FollowerViewPage = ({ userNickName }) => {
  const param = useParams();
  const [userInfoList, setUserInfoList] = useState([<></>]);
  const [otherUserInfo, setOtherUserInfo] = useState({nickname:""});

  let n = 8;
  useEffect(() => {
    //console.dir(param);
    let userData = getOtherMemberInfo(param.id);
    userData.then((res) => {
      console.dir(res);
      setOtherUserInfo(res);
    })

    setUserInfoList([...Array(5)].map((e, i) => <UserInfoItem></UserInfoItem>));
  }, []);
  return (
    <>
      <HeaderComponent backVisible={true} pageName={otherUserInfo.nickname}></HeaderComponent>
      <div className="follower-view-container">
        <div className="follower-view-nav">
          <div className="follower-nav-btn focus-tab">
            <p>팔로워</p>
          </div>
          <div className="following-nav-btn">
            <p>팔로잉</p>
          </div>
        </div>
        <div className="follower-info-container">{userInfoList}</div>
      </div>
    </>
  );
};

export default FollowerViewPage;
