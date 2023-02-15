import { useEffect, useState } from "react";

/* import img */
import sunnyImg from "../../../assets/GlobalAsset/sunny.png";
import cloudyImg from "../../../assets/GlobalAsset/cloudy.png";
import rainyImg from "../../../assets/GlobalAsset/rainy.png";
import closeBtn from "../../../assets/GlobalAsset/close-btn.png";

/* import COLORS */
import COLORS from "../../../styles/colors.js";

/* import component */

/* css import */
import "./WeatherBtnComponent.css";

const WeatherBtnComponent = ({ weather }) => {
  const [weatherBtn, setWeatherBtn] = useState(<></>);

  useEffect(() => {
    switch (weather) {
      case "SUNNY":
        setWeatherBtn(
          <div className="accept-btn" style={{ backgroundColor: COLORS.yellowP }}>
            <img alt="sunnyImg" src={sunnyImg} />
          </div>
        );
        break;
      case "CLOUDY":
        setWeatherBtn(
          <div className="accept-btn" style={{ backgroundColor: COLORS.mono300 }}>
            <img src={cloudyImg} />
          </div>
        );
        break;
      case "RAINY":
        setWeatherBtn(
          <div className="accept-btn" style={{ backgroundColor: COLORS.blueP }}>
            <img alt="rainyImg" src={rainyImg} />
          </div>
        );
        break;
      default:
        setWeatherBtn(<></>);
        break;
    }
  }, [weather]);

  return (
    <>
      <div className="weather-btn-component">
        {weatherBtn}
        <div className="cancel-btn" style={{ backgroundColor: COLORS.mono100 }}>
          <img alt="closeBtn" src={closeBtn} />
        </div>
      </div>
    </>
  );
};

export default WeatherBtnComponent;
