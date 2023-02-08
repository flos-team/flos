import { useEffect, useState } from "react";

/* import img assets */
import closeIcon from "../../assets/GlobalAsset/close-btn.png";

/* import component */
import AlarmItemHeader from "./AlarmItemHeader/AlarmItemHeader";
import WeatherBtnComponent from "./WeatherBtnComponent/WeatherBtnComponent";

/* import css */
import "./AlarmItem.css";
import { jsx } from "@emotion/react";

// axios
import {deleteNotification} from '../../api/NotificationAPI'

/**
 * @param {ImageBitmap} AlarmImg 알람 왼쪽에 배치될 이미지 비트맵 파일
 * @param {jsx} AlarmTextJSX 알람 내용 jsx
 * @param {string} AlarmTimeLog 알림 발생 시점
 *
 * [알림] AlarmItem 은 자체적으로 margin : 0 auto 속성이 있습니다.
 *
 * @returns  {void}
 */
const AlarmItem = ({ AlarmImg, AlarmTextJSX, AlarmTimeLog, weather, id }) => {
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

  const deleteNoti = () => {
    deleteNotification(id).then((res) => {
      console.log(res)
    })
  }
  return (
    <div className="alarm-item">
      <AlarmItemHeader AlarmImg={AlarmImg} AlarmTextJSX={AlarmTextJSX} AlarmTimeLog={AlarmTimeLog}></AlarmItemHeader>
      <div className="close-btn">
        <img src={closeIcon} onClick={deleteNoti}/>
      </div>
      {weatherBtnComponent}
    </div>
  );
};

export default AlarmItem;
