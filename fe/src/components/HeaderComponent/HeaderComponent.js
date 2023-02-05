import { useState } from "react";

/* import image assets */
import arrowLeft from "../../assets/GlobalAsset/arrow-left.png";
import notifyIcon from "../../assets/GlobalAsset/notification.png";
import settingIcon from "../../assets/GlobalAsset/setting-btn.png";
import checkIcon from "../../assets/GlobalAsset/check-icon.png";
import cameraBtn from "../../assets/GlobalAsset/camera-btn.png";
import statisticsBtn from "../../assets/GlobalAsset/statistics-btn.png";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* import css */
import "./HeaderComponent.css";
/**
 * backVisible:Boolean/뒤로 가기 표시, pageName:String/현재 페이지 이름, menuOpt1={CAMERA(카메라), STASTICS(통계)}, menuOpt2={ALERT(알림), SETTING(세팅), CHECK(체크)}
 */
const HeaderComponent = ({ backVisible, pageName, menuOpt1, menuOpt2, menuOpt1Func, menuOpt2Func }) => {
  const navigate = useNavigate();

  // /* 뒤로갈 페이지가 있을 경우 arrow 표시 */
  // const backImg = backVisible ? (
  //   <img src={angleLeft} onClick={() => navigate(-1)}></img>
  // ) : (
  //   <></>
  // );
  // const notificationCase = (
  //   <Link to="/notification">
  //     <div className="btn-div">
  //       <img className="option-btn" src={notification}></img>
  //     </div>
  //   </Link>
  // );
  let optBtn1 = null;
  switch (menuOpt1) {
    case "CAMERA": // 카메라
      optBtn1 = <img className="opt-icon" src={cameraBtn}></img>;
      break;
    case "STATISTICS": // 통계
      optBtn1 = (
        <Link to="/dashboard">
          <img className="opt-icon" src={statisticsBtn}></img>
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
          <img className="opt-icon" src={notifyIcon}></img>
        </Link>
      );
      break;
    case "SETTING": // 세팅
      optBtn2 = (
        <Link to="/settings">
          <img className="opt-icon" src={settingIcon}></img>
        </Link>
      );
      break;
    case "CHECK": // 체크
      optBtn2 = <img className="opt-icon" src={checkIcon}></img>;
      break;
    default:
      optBtn2 = <></>;
      break;
  }
  // 글 작성할때 체크랑 사진
  let arrowBtn = backVisible ? (
    <div className="back-btn">
      <img className="back-icon" onClick={() => navigate(-1)} src={arrowLeft} />
    </div>
  ) : (
    <></>
  );
  // const settingCase = (
  //   <Link to="/settings">
  //     <div className="btn-div">
  //       <img className="option-btn" src={settingBtn}></img>
  //     </div>
  //   </Link>
  // );
  return (
    <>
      <div className="top-bar">
        {arrowBtn}
        <div className="title-div">
          <p className="title-name">{pageName}</p>
        </div>
        <div className="opt-btn">{optBtn1}</div>
        <div
          className="opt-btn"
          onClick={(e) => {
            menuOpt2Func();
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
