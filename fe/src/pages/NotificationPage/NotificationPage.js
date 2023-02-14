import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

/* import img css */
import goormSad from "../../assets/GoormAsset/goorm-sad.png";
import defaultImg from "../../assets/GoormAsset/goorm-sunglass.png";

/* import component */
import AlarmItem from "../../components/AlarmItem/AlarmItem";

/* import css */
import "./NotificationPage.css";

import { getNotification } from "../../api/NotificationAPI";
import { getTimeDiffText } from "../../api/DateModule";

import dayjs from "dayjs";

const NotificationPage = () => {
  const [notiList, setNotiList] = useState([]);
  const [notiItemList, setNotiItemList] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const url = "https://i8b210.p.ssafy.io/api/file/";

  useEffect(() => {
    // getNotification().then((res) => {
    //   setNotiList(res.notifications);
    // });
    bringNoticeList();
  }, []); // 너무 많은 요청 발생합니다...
  const bringNoticeList = () => {
    getNotification().then((res) => {
      // console.log(res)
      setNotiList(res.notifications);

      let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");

      if (notiList !== undefined) {
        setNotiItemList(
          res.notifications.map(({ id, message, createdAt, data, messageType }) => {

            let postDay = dayjs(createdAt, "YYYY-MM-DD HH:mm:ss");
            let RegBefore = getTimeDiffText(postDay, curDay);
            let profileImg = "";
            let notiSource = "";

            switch (messageType) {
              case "NEWFEED":
              case "COMMENTCHOSEN":
                profileImg = `${url}${data.writer.profileImage.saveName}`
                notiSource = data.id
                break;
              case "NEWCOMMENT":
              case "NEWREPLY":
                profileImg = `${url}${data.commenter.profileImage.saveName}`
                notiSource = data.commenter.id
                break;
              case "FOLLOW":
                profileImg = `${url}${data.profileImage.saveName}`
                notiSource = data.id
                break;
              case "NOCAREPLANT24H":
              case "NOFEED24H":
                profileImg = `${goormSad}`
                break;
              default:
                profileImg = `${goormSad}`
                break;
            }

            return (
              <AlarmItem
                AlarmImg={profileImg}
                AlarmTextJSX={message}
                AlarmTimeLog={RegBefore}
                id={id}
                messageType={messageType}
                notiSrc={notiSource}
                render={(e) => {
                  bringNoticeList();
                }}
              ></AlarmItem>
            );
          })
        );
      }
    });
  };

  const noItem = (
    <div>
      <img src={defaultImg} alt="" className="defaultimg"></img>
      <p className="no-noti-text">알림이 없습니다.</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#e8e8e8" }}>
      <HeaderComponent backVisible={true} pageName={"알림"}></HeaderComponent>
      {notiList === undefined ? (
        <div className="noalarm-container">{noItem}</div>
      ) : (
        <div className="alarm-container">{notiItemList}</div>
      )}
    </div>
  );
};

export default NotificationPage;
