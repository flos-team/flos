/* import react */
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import react-redux */
import { useSelector, useDispatch } from "react-redux";
import { garden } from "../../../redux/page";

/* import img */

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostItem from "../../../components/PostItem/PostItem";
import Swal from "sweetalert2";

///// MUI ////////////////
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/* import module */
import { getMemberInfo } from "../../../api/MemberAPI";
import { getPostListByNickname, getBookMarkList } from "../../../api/PostAPI";

/* import css */
import "./ProfilePage.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePage = ({ setIsToast }) => {
  // temp, 다른사람 페이지로 이동하는 메서드
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  ///////// temp //////////////
  // 경고창용 swal
  // 팔로잉/팔로우 오류 시 swal 창
  const showError = () => {
    Swal.fire({
      icon: "error",
      title: "오류 발생",
      text: "주하 계정이 아닙니다... 테스트 불가",
      footer: "주하에게 문의하세여.",
    });
  };

  let testBtn = (
    <button
      style={{
        width: "160px",
        height: "30px",
        display: "block",
        margin: "0 auto",
      }}
      onClick={async (e) => {
        if (user.id === 4) {
          navigate(`/flower-end-page/${1}`);
        } else {
          showError();
        }
      }}
    >
      기능테스트
    </button>
  );

  ////////////////////////////
  const dispatch = useDispatch();
  // 사용자 정보에 따른 포스트 리스트 state
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);

  // 사용자가 작성한 북마크의 세팅을 위한 state
  const [bookPosts, setBookPosts] = useState([]);
  const [newBookPosts, setNewBookPosts] = useState([]);

  const [nextPage, setNextPage] = useState(0);
  const [hasNext, setHasNext] = useState();

  // 사용자 정보 init
  const userInfos = [1000, 1000, 1000, 1000];
  const [userInfoList, setUserInfoList] = useState(
    userInfos.map((e, key) => <li key={key}>{e > 999 ? "999+" : e}</li>)
  );

  // 사용자 정보를 다루는 state
  const [userInfo, setUserinfo] = useState({});
  // 사용자 이미지 state
  const [userImgURL, setUserImgURL] = useState("");
  // redux-toolkit
  const toastValue = useSelector((state) => state.toast.isToast);

  useEffect(() => {
    if (newPosts) {
      setPosts([...posts, ...newPosts]);
    }
  }, [newPosts]);

  useEffect(() => {
    if (newBookPosts) {
      setBookPosts([...bookPosts, ...newBookPosts]);
    }
  }, [newBookPosts]);

  // 화면이 렌딩될 경우 사용자 정보를 요청하고 프로필에 세팅
  useEffect(() => {
    getMemberInfo().then((response) => {
      setUserinfo({
        nickname: response.nickname,
        introduction: response.introduction,
      });
      setUserImgURL(
        `********${response.profileImage.saveName}`
      );
      let list = [
        response.followerCount,
        response.followingCount,
        response.postCount,
        response.blossomCount,
      ];
      setUserInfoList(
        list.map((e, key) => {
          let liEle = <></>;
          if (key <= 1) {
            liEle = (
              <li
                key={key}
                onClick={(e) => {
                  navigate(`/follower-view-page/${response.id}?${key}`);
                }}
              >
                {e > 999 ? "999+" : e}
              </li>
            );
          } else liEle = <li key={key}>{e > 999 ? "999+" : e}</li>;
          return liEle;
        })
      );
      getPostListByNickname(response.nickname).then((data) => {
        setPosts(data.content);
        setNextPage(data.nextPage);
        setHasNext(data.hasNext);
      });
    });
  }, []);

  const postList = posts.map((key) => <PostItem post={key}></PostItem>);
  const bookPostList = bookPosts.map((key) => <PostItem post={key}></PostItem>);

  // 스크롤 끝을 감지하는 메서드
  // 무한 스크롤 구현부
  const postHandleScroll = (e) => {
    if (
      e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight &&
      hasNext
    ) {
      getPostListByNickname(userInfo.nickname, nextPage).then((response) => {
        setHasNext(response.hasNext);
        setNextPage(response.nextPage);
        setNewPosts(response.content);
      });
    }
  };

  const bookMarkHandleScroll = (e) => {
    if (
      e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight &&
      hasNext
    ) {
      getBookMarkList(nextPage).then((response) => {
        setHasNext(response.hasNext);
        setNextPage(response.nextPage);
        setNewBookPosts(response.content);
      });
    }
  };

  // MUI
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (Number(event.target.id.split("-")[2])) {
      case 1:
        getBookMarkList().then((response) => {
          setHasNext(response.hasNext);
          setNextPage(response.nextPage);
          setBookPosts(response.content);
        });
        break;
      default:
        getPostListByNickname(userInfo.nickname).then((data) => {
          setPosts(data.content);
          setNextPage(data.nextPage);
          setHasNext(data.hasNext);
        });
        break;
    }
  };

  return (
    <>
      <HeaderComponent
        backVisible={false}
        pageName={user.nickname}
        menuOpt2={"SETTING"}
        menuOpt1={"STATISTICS"}
      ></HeaderComponent>
      <div className="profile-page-container hide-scroll">
        <div className="user-info-header">
          <div
            className="user-img"
            style={{ backgroundImage: `url(${userImgURL})` }}
          ></div>
          <div className="profile-edit-nav-container">
            <Link to="/profile-modify">
              <div className="profile-edit-btn">
                <p>프로필 편집</p>
              </div>
            </Link>
          </div>
          <div className="user-introduce-contanier">
            <p>{userInfo.introduction}</p>
          </div>
        </div>
        <div className="user-social-info-box">
          <ul className="social-info-title">
            <li>팔로워 </li>
            <li>팔로잉</li>
            <li>게시글</li>
            <li
              onClick={() => {
                dispatch(garden());
              }}
            >
              꽃송이{" "}
            </li>
          </ul>
          <ul className="social-info-count">{userInfoList}</ul>
        </div>
        {/* {testBtn} */}
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab
                label="내 포스트"
                {...a11yProps(0)}
                style={{
                  width: "35%",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <Tab
                label="북마크"
                {...a11yProps(1)}
                style={{
                  width: "35%",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div
              className="post-container hide-scroll"
              onScroll={postHandleScroll}
            >
              {postList.length > 0 ? (
                postList
              ) : (
                <div className="no-post-item">
                  <p>불러올 게시글이 없습니다.</p>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div
              className="post-container hide-scroll"
              onScroll={bookMarkHandleScroll}
            >
              {bookPostList.length > 0 ? (
                bookPostList
              ) : (
                <div className="no-post-item">
                  <p>불러올 게시글이 없습니다.</p>
                </div>
              )}
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default ProfilePage;
