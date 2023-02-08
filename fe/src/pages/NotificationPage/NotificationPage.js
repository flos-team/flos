import { useState, useEffect } from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
/* import img css */
import userImg from "../../assets/DummyData/writerProfileSample.png";

/* import component */
import AlarmItem from "../../components/AlarmItem/AlarmItem";

/* import css */
import "./NotificationPage.css";

import { getNotification } from "../../api/NotificationAPI"
import { getTimeDiffText } from '../../api/DateModule'

import dayjs from "dayjs";

const NotificationPage = () => {

  const [notiList, setNotiList] = useState([]);
  // const [redPoint, setRedPoint] = useState(false)

  const url = "https://i8b210.p.ssafy.io/api/file/"

  useEffect(() => {
    getNotification().then((res) => {
      setNotiList(res.notifications)
    })
  }, [])

  
  let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
  
  const notiItemList = notiList.map(({message, createdAt, data, messageType}) => {
    let postDay = dayjs(createdAt, "YYYY-MM-DD HH:mm:ss");
    let RegBefore = getTimeDiffText(postDay, curDay);
    let profileImg = ''
    switch (messageType) {
      case "NEWFEED":
      case "NEWCOMMENT":
      case "NEWREPLY":
      case "COMMENTCHOSEN":
        profileImg = `${url}${data.writer.profileImage.saveName}`
        break;
      case "FOLLOW":
        profileImg = `${url}${data.profileImage.saveName}`
        break;
      default:
        profileImg = {userImg}
        break;
    }
    let notiId = data.id

    return <AlarmItem AlarmImg={profileImg} AlarmTextJSX={message} AlarmTimeLog={RegBefore} id={notiId}></AlarmItem>;
  });

  // 알림이 1개라도 있으면 점찍기
  // const isHaveNotification = () => {
  //   if (notiList.length >= 1) {
  //     setRedPoint(true)
  //   } else {
  //     setRedPoint(false)
  //   }
  // }

  
  return (
    <div style={{ backgroundColor: "#e8e8e8" }}>
      <HeaderComponent backVisible={true} pageName={"알림"}></HeaderComponent>
      <div className="alarm-container">{notiItemList}</div>
    </div>
  );
};

export default NotificationPage;
