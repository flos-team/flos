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
  const url = "https://i8b210.p.ssafy.io/api/file/"

  useEffect(() => {
    getNotification().then((res) => {
      setNotiList(res)
    })
  }, [])
  
  let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");

  const notiItemList = notiList.map(({message, createdAt, data}) => {

    let postDay = dayjs(createdAt, "YYYY-MM-DD HH:mm:ss");
    let RegBefore = getTimeDiffText(postDay, curDay);
    let profileImg = `${url}${data.writer.profileImage.saveName}`
  
    return <AlarmItem AlarmImg={profileImg} AlarmTextJSX={message} AlarmTimeLog={RegBefore}></AlarmItem>;
  });

  
  return (
    <div style={{ backgroundColor: "#e8e8e8" }}>
      <HeaderComponent backVisible={true} pageName={"알림"} optType={0}></HeaderComponent>
      <div className="alarm-container">{notiItemList}</div>
    </div>
  );
};

export default NotificationPage;
