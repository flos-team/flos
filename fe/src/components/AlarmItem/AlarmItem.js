import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

/* import img assets */
import closeIcon from "../../assets/GlobalAsset/close-btn.png";

/* import component */
import AlarmItemHeader from "./AlarmItemHeader/AlarmItemHeader";
import WeatherBtnComponent from "./WeatherBtnComponent/WeatherBtnComponent";

/* import css */
import "./AlarmItem.css";
// import { jsx } from "@emotion/react";

// axios
import { deleteNotification } from "../../api/NotificationAPI";

import Swal from 'sweetalert2'

/**
 * @param {ImageBitmap} AlarmImg 알람 왼쪽에 배치될 이미지 비트맵 파일
 * @param {jsx} AlarmTextJSX 알람 내용 jsx
 * @param {string} AlarmTimeLog 알림 발생 시점
 *
 * [알림] AlarmItem 은 자체적으로 margin : 0 auto 속성이 있습니다.
 *
 * @returns  {void}
 */
const AlarmItem = ({ AlarmImg, AlarmTextJSX, AlarmTimeLog, weather, id, render, messageType, notiSrc }) => {
  const navigate = useNavigate();
  const [weatherBtnComponent, setWeatherBtnComponent] = useState(<></>);
  useEffect(() => {
    switch (weather) {
      case "SUNNY":
        setWeatherBtnComponent(<WeatherBtnComponent weather={weather}></WeatherBtnComponent>);
        break;
      case "CLOUDY":
        setWeatherBtnComponent(<WeatherBtnComponent weather={weather}></WeatherBtnComponent>);
        break;
      case "RAINY":
        setWeatherBtnComponent(<WeatherBtnComponent weather={weather}></WeatherBtnComponent>);
        break;
      default:
        setWeatherBtnComponent(<></>);
        break;
    }
  }, [weather]);

  const deleteNoti = (id) => {
    deleteNotification(id).then((res) => {
      // console.log(res);
      render();
    });
  };

  const goNotiSource = () => {
    if (messageType === 'FOLLOW'){
      navigate(`/other-profile-page/${notiSrc}`) // 사용자 페이지로 이동
    } else if (messageType === 'NEWFEED' || messageType === 'COMMENTCHOSEN' || messageType === 'NEWCOMMENT' || messageType === 'NEWREPLY') {
      navigate(`/main/post/${notiSrc}`) // 해당 피드로 이동
    } else if (messageType === 'NOCAREPLANT24H' || messageType === 'NOFEED24H'){
      navigate('/main')
    } else if (messageType === 'UNAVAILABLE'){
      Swal.fire({
        icon: "error",
        title: "삭제된 게시글입니다.",
      });
    }
  }

  return (
    <div className="alarm-item">
      <div className="alram-div" onClick={goNotiSource}>
        <AlarmItemHeader AlarmImg={AlarmImg} AlarmTextJSX={AlarmTextJSX} AlarmTimeLog={AlarmTimeLog}></AlarmItemHeader>
      </div>
      <div className="close-btn">
        <img
          alt=""
          src={closeIcon}
          onClick={(e) => {
            deleteNoti(id);
          }}
        />
      </div>
      {weatherBtnComponent}
    </div>
  );
};

export default AlarmItem;
