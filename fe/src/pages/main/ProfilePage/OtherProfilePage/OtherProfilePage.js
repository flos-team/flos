/* import react */
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFollowingIdList } from "../../../../redux/user";

/* import img */
import reportIcon from "../../../../assets/GlobalAsset/report-icon.png";


/* import component */
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../../components/PostItem/PostItem";
import ReportModal from "../../../../components/ReportModal/ReportModal";

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
    ["팔로워", "팔로잉", "게시글", "꽃송이"].map((e, i) => <li key={i}>{e}</li>)
  );
  const [userInfoList, setUserInfoList] = useState([0, 0, 0, 0].map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>));

  // 사용자 정보 state
  const [userInfo, setUserInfo] = useState({ nickname: "", introduction: "" });
  const params = useParams();

  // 사용자 정보에 따른 포스트 리스트 state
  const [postList, setPostList] = useState([<></>]);
  // 사용지 프로필 이미지 정보 state
  const [userImgURL, setUserImgURL] = useState("");

  // 팔로워/팔로잉 구분을 위한 토글
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

    for (let i = 0; i < userIdList.length; i++) {
      //console.log(userIdList);
      // console.dir(user);
      if (userIdList[i] == params.id) {
        isFollowed = true;
        break;
      }
    }
    // console.log(isFollowed);
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
    let otherUserId = Number(params.id);
    // console.log(otherUserId);
    if (toggleFactor) {
      setFollowText("팔로우");
      let data = cancelFollowing(otherUserId);
      data.then((res) => {
        if (res) {
          //alert("팔로우 취소 성공");
          let newList = userIdList.filter((id) => otherUserId !== id);
          dispatch(setFollowingIdList(newList));
          //console.log(newList);
          // 성공 swal
          showSuccess("팔로우 취소");
        } else {
          console.log("서버로 부터 응답 받음 그러나 문제 발생");
          console.dir(res);
          // 오류 swal
          showError("팔로우 취소");
        }
      });
    } else {
      setFollowText("팔로잉");
      let data = doFollowing(otherUserId);
      data.then((res) => {
        if (res) {
          let newList = userIdList.concat(otherUserId);
          dispatch(setFollowingIdList(newList));
          //console.log(newList);
          // 성공 swal
          showSuccess("팔로우");
        } else {
          console.log("서버로 부터 응답 받음 그러나 문제 발생");
          console.dir(res);
          // 오류 swal
          showError("팔로우");
        }
      });
    }
    setToggleFactor(!toggleFactor);
  };

  useEffect(() => {
    let data = getOtherMemberInfo(params.id);
    data.then((res) => {
      setUserInfo({ nickname: res.nickname, introduction: res.introduction });
      // .map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>);
      let list = [res.followerCount, res.followingCount, res.postCount, res.blossomCount];
      setUserInfoList(
        list.map((e, i) => {
          let liEle = <></>;
          if (i <= 1) {
            liEle = (
              <li
                key={i}
                onClick={(e) => {
                  navigate(`/follower-view-page/${res.id}?${i}`);
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
        setPostList(res.content.map((e, i) => <PostItem key={i} post={e}></PostItem>));
      });
      // 사용자 이미지 렌더링
      setUserImgURL(`********${res.profileImage.saveName}`);
    });
  }, []);

  const [isClose, setIsClose] = useState(false);
  useEffect(() => {
    
  },[isClose])

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
          <div className="show-report" style={{ backgroundImage: `url(${reportIcon})` }} onClick={(e) => {
            setIsClose(true);
          }}></div>
        </div>
        <div className="user-social-info-box">
          <ul className="social-info-title">{titleList}</ul>
          <ul className="social-info-count">{userInfoList}</ul>
        </div>
        <div className="post-container hide-scroll">{postList}</div>
      </div>
      {isClose?<ReportModal setClose={setIsClose}></ReportModal>:<></>}
    </>
  );
};

export default OtherProfilePage;
