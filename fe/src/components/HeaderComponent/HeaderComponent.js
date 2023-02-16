import { useEffect, useState } from "react";

/* import image assets */
import arrowLeft from "../../assets/GlobalAsset/arrow-left.png";
import notifyIcon from "../../assets/GlobalAsset/notification.png";
import settingIcon from "../../assets/GlobalAsset/setting-btn.png";
import checkIcon from "../../assets/GlobalAsset/check-icon.png";
import cameraBtn from "../../assets/GlobalAsset/camera-btn.png";
import statisticsBtn from "../../assets/GlobalAsset/statistics-btn.png";
import closeBtn from "../../assets/GlobalAsset/close-btn.png";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* import css */
import "./HeaderComponent.css";
/**
 *
 * @param {boolean} backVisible 백버튼 유무
 * @param {boolean} isClear 투명도 css 속성 줄지
 * @param {string} pageName 페이지 이름
 * @param {Enum} menuOpt1 CAMERA | STATISTICS
 * @param {Enum} menuOpt2 ALERT | SETTING | CHECK | CLOSE
 * @param {function} menuOpt1Func 오른쪽 액션 메뉴 1번째에 맵핑할 함수
 * @param {function} menuOpt2Func 오른쪽 엑션 메뉴 2번째에 맵핑할 함수
 * @returns
 */
const HeaderComponent = ({ backVisible, isClear, pageName, menuOpt1, menuOpt2, menuOpt1Func, menuOpt2Func }) => {
  const navigate = useNavigate();
  let optBtn1 = null;
  switch (menuOpt1) {
    case "CAMERA": // 카메라
      optBtn1 = <img className="opt-icon" src={cameraBtn} alt="cam"></img>;
      break;
    case "STATISTICS": // 통계
      optBtn1 = (
        <Link to="/dashboard">
          <img className="opt-icon" src={statisticsBtn} alt="stat"></img>
        </Link>
      );
      break;
    default:
      optBtn1 = <></>;
      break;
  }
  let optBtn2 = null;
  switch (menuOpt2) {
    case "ALERT": // 알림
      optBtn2 = (
        <Link to="/notification">
          <img className="opt-icon" src={notifyIcon} alt="notify"></img>
        </Link>
      );
      break;
    case "SETTING": // 세팅
      optBtn2 = (
        <Link to="/settings">
          <img className="opt-icon" src={settingIcon} alt="setting"></img>
        </Link>
      );
      break;
    case "CHECK": // 체크
      optBtn2 = <img className="opt-icon" src={checkIcon} alt="check"></img>;
      break;
    case "CLOSE":
      optBtn2 = <img className="opt-icon" src={closeBtn} alt="close" />;
      break;
    default:
      optBtn2 = <></>;
      break;
  }
  // 글 작성할때 체크랑 사진
  let arrowBtn = backVisible ? (
    <div className="back-btn">
      <img className="back-icon" onClick={() => navigate(-1)} src={arrowLeft} alt="back-btn" />
    </div>
  ) : (
    <></>
  );
  const pageNameStyle = {
    fontSize: "16px",
  };

  return (
    <>
      <div className="top-bar clear-back">
        {arrowBtn}
        <div className="title-div">
          <p className="title-name" style={pageName !== undefined && pageName.length >= 9 ? pageNameStyle : {}}>
            {pageName}
          </p>
        </div>
        <div
          className="opt-btn"
          onClick={(e) => {
            if (menuOpt1Func) {
              menuOpt1Func();
            }
          }}
        >
          {optBtn1}
        </div>
        <div
          className="opt-btn"
          onClick={(e) => {
            if (menuOpt2Func) {
              menuOpt2Func();
            }
          }}
        >
          {optBtn2}
        </div>
      </div>
    </>
  );
};

HeaderComponent.defaultProps = {
  optType: "DEFAULT VALUE",
};

export default HeaderComponent;
