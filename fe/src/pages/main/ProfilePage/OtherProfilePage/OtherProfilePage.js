/* import react */
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollowingIdList } from "../../../../redux/user";

/* import img */

/* import component */
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../../components/PostItem/PostItem";

/* import modules */
import { getOtherMemberInfo } from "../../../../api/MemberAPI";
import { getPostListByNickname } from "../../../../api/PostAPI";
import { doFollowing, cancelFollowing } from "../../../../api/FollowAPI";
import Swal from "sweetalert2";

// import {}

/* import css */
import "./OtherProfilePage.css";

const OtherProfilePage = ({ userNickName }) => {
  // 사용자 정보 리덕스
  const user = useSelector((state) => state.user.userData);
  const userIdList = useSelector((state) => state.user.followingIdList);
  const dispatch = useDispatch();

  // 사용자 정보를 init
  // temp, 다른사람 페이지로 이동하는 메서드
  const navigate = useNavigate();
  const [titleList, setTitleList] = useState(
    ["팔로잉", "팔로우", "게시글", "꽃송이"].map((e, i) => <li key={i}>{e}</li>)
  );
  const [userInfoList, setUserInfoList] = useState([0, 0, 0, 0].map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>));
  const [isFollowed, setIsFollowed] = useState(false);

  // 사용자 정보 state
  const [userInfo, setUserInfo] = useState({ nickname: "", introduction: "" });
  const params = useParams();

  // 사용자 정보에 따른 포스트 리스트 state
  const [postList, setPostList] = useState([<></>]);
  // 사용지 프로필 이미지 정보 state
  const [userImgURL, setUserImgURL] = useState("");

  // 토글
  const [toggleFactor, setToggleFactor] = useState(true);
  const [followText, setFollowText] = useState("팔로잉");

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
      className={toggleFactor ? "followed-btn" : "following-btn"}
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

  useEffect(() => {
    // console.dir(params);
    // 사용자 닉네임을 기준으로 정보 불러오기
    let data = getOtherMemberInfo(params.id);
    data.then((res) => {
      // console.dir(res);
      // userInfo, setUserInfo
      // profileImage.saveName
      // console.dir(res);
      setUserInfo({ nickname: res.nickname, introduction: res.introduction });
      // .map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>);
      let list = [res.followingCount, res.followerCount, res.postCount, res.blossomCount];
      setUserInfoList(
        list.map((e, i) => {
          let liEle = <></>;
          if (i <= 1) {
            liEle = (
              <li
                key={i}
                onClick={(e) => {
                  navigate(`/follower-view-page/${res.id}`);
                }}
              >
                {e > 999 ? "999+" : e}
              </li>
            );
          } else liEle = <li key={i}>{e > 999 ? "999+" : e}</li>;
          return liEle;
        })
      );
      // 사용자 닉네임을 기준으로 포스트 불러오기
      let data = getPostListByNickname(res.nickname);
      data.then((res) => {
        //console.dir(res);
        // res.content
        setPostList(res.content.map((e) => <PostItem post={e}></PostItem>));
      });
      // 사용자 이미지 렌더링
      setUserImgURL(`https://i8b210.p.ssafy.io/api/file/${res.profileImage.saveName}`);

      // 내 팔로잉 정보에 따라서 팔로워 팔로잉 표시 다르게
      let isFollowed = false;
      for (let i = 0; i < userIdList.length; i++) {
        if (userIdList[i] == userInfo.id) {
          isFollowed = true;
          break;
        }
      }
      setToggleFactor(isFollowed);
      setFollowText(isFollowed ? "팔로잉" : "팔로우");
    });
  }, []);

  return (
    <>
      <HeaderComponent backVisible={true} pageName={userInfo.nickname}></HeaderComponent>
      <div className="other-profile-page hide-scroll">
        <div className="user-info-header">
          <div className="user-img" style={{ backgroundImage: `url(${userImgURL})` }}></div>
        </div>
        <div className="user-introduce-container">
          <div className="user-introduce-text">
            <p>{userInfo.introduction}</p>
          </div>
          {followingBtn}
        </div>
        <div className="user-social-info-box">
          <ul className="social-info-title">{titleList}</ul>
          <ul className="social-info-count">{userInfoList}</ul>
        </div>
        <div className="post-container hide-scroll">{postList}</div>
      </div>
    </>
  );
};

export default OtherProfilePage;
