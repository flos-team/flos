/* import react */
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

/* import img */

/* import component */
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../../components/PostItem/PostItem";

/* import modules */
import { getOtherMemberInfo } from "../../../../api/MemberAPI";
import { getPostListByNickname } from "../../../../api/PostAPI";
// import {}

/* import css */
import "./OtherProfilePage.css";

const OtherProfilePage = ({ userNickName }) => {
  // 사용자 정보를 임시로 더미데이터로 맵핑...
  const [titleList, setTitleList] = useState(["팔로잉", "팔로우", "게시글", "꽃송이"].map((e, i) => <li key={i}>{e}</li>));
;  const [userInfoList, setUserInfoList] = useState([0, 0, 0, 0].map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>));
    //userInfos.map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>);
  
  // 사용자 정보 state
  const [userInfo, setUserInfo] = useState({nickname:"", introduction:""});
  const params = useParams();
  
  // 사용자 정보에 따른 포스트 리스트 state
  const [postList, setPostList] = useState([<></>]);

  // 팔로잉 버튼의 렌더링용 함수! 수정하면 안됌
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

  /*
profileImage
: 
originalName
: 
"person3.jpg"
saveName
*/  
  
  useEffect(() => {
    // console.dir(params);
    let data = getOtherMemberInfo(params.id);
    data.then((res) => {
      console.dir(res);
      // userInfo, setUserInfo
      // profileImage.saveName
      setUserInfo({ nickname: res.nickname, introduction: res.introduction });
      // .map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>);      
      let list = [res.followingCount, res.followerCount, res.postCount, res.blossomCount];
      setUserInfoList(list.map((e, i) => <li key={i}>{e > 999 ? "999+" : e}</li>));
      let data = getPostListByNickname(res.nickname);
      data.then((res) => {
        console.dir(res);
        // res.content
        setPostList(res.content.map((e) => (<PostItem post={e}></PostItem>)));
      })

    });

  },[])

  return (
    <>
      <HeaderComponent backVisible={true} pageName={userInfo.nickname}></HeaderComponent>
      <div className="other-profile-page hide-scroll">
        <div className="user-info-header">
          <div className="user-img" style={{ backgroundImage: `url()` }}></div>
        </div>
        <div className="user-introduce-container">
          <div className="user-introduce-text">
            <p>{userInfo.introduction}</p>
          </div>
          <div className={followBtnStyle} onClick={toggleFunction}>
            <p>{followText}</p>
          </div>
        </div>
        <div className="user-social-info-box">
          <ul className="social-info-title">{titleList}</ul>
          <ul className="social-info-count">{userInfoList}</ul>
        </div>
        <div className="post-container hide-scroll">
          {postList}</div>
      </div>
    </>
  );
};

export default OtherProfilePage;
