import { useState, useEffect } from "react";
import sampleImg from '../../assets/HomeAsset/send-letter.png'
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
/* import img css */
import userImg from "../../assets/DummyData/writerProfileSample.png";

/* import component */
import AlarmItem from "../../components/AlarmItem/AlarmItem";

/* import css */
import "./NotificationPage.css";

import { getNotification } from "../../api/NotificationAPI"

// const NotificationPage = () => {
//   let testText = (
//     <>
//       <b>김채원</b>님이 <b>사쿠라</b> 님의 댓글에 좋아요를 누르셨습니다.
//     </>
//   );
//   let testTimeLog = "23시간 전";
//   const [AlarmItemList, setAlarmItemList] = useState([<></>]);

//   let n = 5;
//   let commonAlarmItemList = [...Array(n)].map((e, i) => (
//     <AlarmItem AlarmImg={userImg} AlarmTextJSX={testText} AlarmTimeLog={testTimeLog}></AlarmItem>
//   ));
//   let dummy = ["SUNNY", "CLOUDY", "RAINY", "SUNNY", "CLOUDY", "RAINY", "SUNNY", "CLOUDY", "RAINY"];
//   let newAlarmItemList = commonAlarmItemList.concat(
//     dummy.map((e) => (
//       <AlarmItem AlarmImg={userImg} AlarmTextJSX={testText} AlarmTimeLog={testTimeLog} weather={e}></AlarmItem>
//     ))
//   );
  // useEffect(() => {
  //   setAlarmItemList(newAlarmItemList);
  // }, []);

//   return (
//     <div style={{ backgroundColor: "#e8e8e8" }}>
//       <HeaderComponent backVisible={true} pageName={"알림"} optType={0}></HeaderComponent>
//       <div className="alarm-container">{AlarmItemList}</div>
//     </div>
//   );
// };

// export default NotificationPage;

const NotificationPage = () => {

  const [notiList, setNotiList] = useState([]);

  useEffect(() => {
    getNotification().then((res) => {
      setNotiList(res) 
    })
  }, [])

  const notiItemList = notiList.map(({message, createdAt}) => (
    <AlarmItem AlarmImg={sampleImg} AlarmTextJSX={message} AlarmTimeLog={createdAt}></AlarmItem>
  ));

  
  return (
    <div style={{ backgroundColor: "#e8e8e8" }}>
      <HeaderComponent backVisible={true} pageName={"알림"} optType={0}></HeaderComponent>
      <div className="alarm-container">{notiItemList}</div>
    </div>
  );
};

export default NotificationPage;
