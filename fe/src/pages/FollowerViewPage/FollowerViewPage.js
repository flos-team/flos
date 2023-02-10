/* import react */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFollowerList, getFollowingList, getOtherFollowerList, getOtherFollowingList } from "../../api/FollowAPI";

/* import img */
import userImg from "../../assets/DummyData/dummy-sample.jpg";

/* import lib */


/* import component */
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import UserInfoItem from "./UserInfoItem/UserInfoItem";

/* import module */
import { getMemberInfo, getOtherMemberInfo } from "../../api/MemberAPI";

/* import css */
import "./FollowerViewPage.css";
import { setUser } from "../../redux/user";


///// MUI ////////////////
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const FollowerViewPage = () => {
  const param = useParams();
  const [userInfoList, setUserInfoList] = useState([<></>]);
  const [myFollowingString, setMyFollowingString] = useState("");
  const [isMine, setIsMine] = useState(true);
  const [userInfo, setUserInfo] = useState({ nickname: "" });
  const [followerList, setFollowerList] = useState([<></>]);
  const [followingList, setFollowingList] = useState([<></>]);

  // 현재 로그인한 사람의 정보
  const user = useSelector((state) => state.user.userData);

  // 내 팔로워/팔로잉 정보 가져오는 메서드
  const requestFollowerList = async () => {
    await getFollowerList()
      .then((res) => {
        setFollowerList(res.map((u) => <UserInfoItem userInfo={u} isFollow={false}></UserInfoItem>));        
      })
      .catch((err) => {});
  };

  // 내팔로잉 정보 가져오는 메서드
  const requestFollowingList = async () => {
    await getFollowingList()
      .then((res) => {
        setFollowingList(res.map((u) => <UserInfoItem userInfo={u} isFollow={true}></UserInfoItem>));
      })
      .catch((err) => {});
  };

  // 다른사람 팔로워 정보 가져오는 메서드
  const requestOtherFollowerList = async () => {
    await getOtherFollowerList(param.id).then((res) => {
      // includes
      setFollowerList(res.map((u) => <UserInfoItem userInfo={u} isFollow={false}></UserInfoItem>));        
    })
  }

  // 다른사람 팔로잉 정보 가져오는 메서드
  const requestOtherFollowingList = async () => {
    let data = getOtherFollowingList(param.id);
    data.then((res) => {
      console.dlr(res);
    })
  }

  // MUI
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    //setValue(newValue);
    //console.dir(event.target);
    if (isMine) {
      switch (Number(event.target.id.split("-")[2])) {
        case 0:
          requestFollowerList();
          break;
        case 1:
          requestFollowingList();
          break;
      }      
    } else {
      switch (Number(event.target.id.split("-")[2])) {
        case 0:
          requestOtherFollowerList();
          break;
        case 1:
          // requestOtherFollowingList();
          break;
      }      
    }
  };

  

  useEffect(() => {
    if (param.id == user.id) {
      console.log("나의 팔로워/팔로잉 페이지 입니다.");
      setIsMine(true);
      setUserInfo(user);
      requestFollowerList();    
    } else {
      console.log("타인의 팔로워/팔로잉 페이지 입니다.");
      setIsMine(false);
      getOtherMemberInfo(param.id).then((res) => {
        setUserInfo(res);
      })
      requestOtherFollowerList();
    }
    
  }, []);

  return (
    <>
      <HeaderComponent backVisible={true} pageName={userInfo.nickname}></HeaderComponent>
      <div className="follower-view-container">

        <div className="follower-info-container">{userInfoList}</div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"100%" }} >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered >
              <Tab label="팔로워" {...a11yProps(0)} style={{ display: "block", width:"30vw"}} />
            <Tab label="팔로잉" {...a11yProps(1)} style={{display:"block", width:"30vw"}} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
              {followerList}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {followingList}
        </TabPanel>
    </Box>

      </div>
    </>
  );
};

export default FollowerViewPage;
