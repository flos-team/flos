/* import react */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/* import img */
import userImg from "../../assets/DummyData/dummy-sample.jpg";

/* import lib */

/* import component */
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import UserInfoItem from "./UserInfoItem/UserInfoItem";

/* import module */
import { getMemberInfo, getOtherMemberInfo } from "../../api/MemberAPI";
import { getFollowerList, getFollowingList, getOtherFollowerList, getOtherFollowingList } from "../../api/FollowAPI";

/* import css */
import "./FollowerViewPage.css";
import { setUser } from "../../redux/user";

///// MUI ////////////////
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

const FollowerViewPage = () => {
  const param = useParams();
  const location = useLocation();
  // console.log(location.search[1]);
  const tabPosition = Number(location.search[1]);
  // console.log(e);
  const [userInfoList, setUserInfoList] = useState([]);
  const [isMine, setIsMine] = useState(true);
  const [userInfo, setUserInfo] = useState({ nickname: "" });
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  // 현재 로그인한 사람의 정보
  const user = useSelector((state) => state.user.userData);

  // 내 팔로워/팔로잉 정보 가져오는 메서드
  const requestFollowerList = async () => {
    await getFollowerList()
      .then((res) => {
        setFollowerList(res.map((u, i) => <UserInfoItem key={i} userInfo={u} paramId={param.id}></UserInfoItem>));
      })
      .catch((err) => {});
  };

  // 내팔로잉 정보 가져오는 메서드
  const requestFollowingList = async () => {
    await getFollowingList()
      .then((res) => {
        setFollowingList(res.map((u, i) => <UserInfoItem key={i} userInfo={u} paramId={param.id}></UserInfoItem>));
      })
      .catch((err) => {});
  };

  // 다른사람 팔로워 정보 가져오는 메서드
  const requestOtherFollowerList = async () => {
    await getOtherFollowerList(param.id).then((res) => {
      if (res) {
        setFollowerList(res.map((u, i) => <UserInfoItem key={i} userInfo={u} paramId={param.id}></UserInfoItem>));
      }
    });
  };

  // 다른사람 팔로잉 정보 가져오는 메서드
  const requestOtherFollowingList = async () => {
    getOtherFollowingList(param.id).then((res) => {
      if (res) {
        setFollowingList(res.map((u, i) => <UserInfoItem key={i} userInfo={u} paramId={param.id}></UserInfoItem>));
      }
    });
  };

  // MUI
  const [value, setValue] = useState(tabPosition);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue)
    // console.dir(event.target);
    if (isMine) {
      switch (Number(event.target.id.split("-")[2])) {
        case 0:
          requestFollowerList();
          break;
        case 1:
          requestFollowingList();
          break;
        default:
          break;
      }
    } else {
      switch (Number(event.target.id.split("-")[2])) {
        case 0:
          requestOtherFollowerList();
          break;
        case 1:
          requestOtherFollowingList();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    // console.log(`팔로워 리스트 길이 ${followerList.length}`);
    // console.dir(followerList.length);
    // console.log(`팔로잉 리스트 길이 ${followingList.length}`);
    // console.dir(followingList);

    if(tabPosition === 0){
      if (param.id == user.id) {
        // console.log("나의 팔로워/팔로잉 페이지 입니다.");
        setIsMine(true);
        setUserInfo(user);
        requestFollowerList();
      } else {
        // console.log("타인의 팔로워/팔로잉 페이지 입니다.");
        setIsMine(false);
        getOtherMemberInfo(param.id).then((res) => {
          setUserInfo(res);
        });
        requestOtherFollowerList();
      }
    } else if(tabPosition === 1){
      if (param.id == user.id) {
        // console.log("나의 팔로워/팔로잉 페이지 입니다.");
        setIsMine(true);
        setUserInfo(user);
        requestFollowingList();
      } else {
        // console.log("타인의 팔로워/팔로잉 페이지 입니다.");
        setIsMine(false);
        getOtherMemberInfo(param.id).then((res) => {
          setUserInfo(res);
        });
        requestFollowingList();
      }
    }
  }, []);

  return (
    <>
      <HeaderComponent backVisible={true} pageName={userInfo.nickname}></HeaderComponent>
      <div className="follower-view-container">
        <div className="follower-info-container">{userInfoList}</div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered> 
              <Tab label="팔로워" {...a11yProps(0)} />
              <Tab label="팔로잉" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {followerList&&followerList.length?followerList:<div>팔로워가 존재하지 않습니다.</div>}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {followingList&&followingList.length?followingList:<div>팔로우 한 사람이 존재하지 않습니다.</div>}
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default FollowerViewPage;
