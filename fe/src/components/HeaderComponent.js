import { useState } from "react";

/* import image assets */
import arrowLeft from "../assets/GlobalAsset/arrow-left.png";
import notifyIcon from "../assets/GlobalAsset/notification.png";
import settingIcon from "../assets/GlobalAsset/setting-btn.png";
import checkIcon from "../assets/GlobalAsset/check-icon.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* import css */
import "./HeaderComponent.css";
/** 
 * backVisible:Boolean/뒤로 가기 표시, pageName:String/현재 페이지 이름, optType:Integer/{0:알림, 1:세팅, 2:체크}
 */
const HeaderComponent = ({ backVisible, pageName, optType }) => {
  // const navigate = useNavigate();

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

  let optBTn = null;
  switch (optType) {
    case 0: // 알림
      optBTn = <img className="opt-icon" src={notifyIcon}></img>;
      break;
    case 1: // 세팅
      optBTn = <img className="opt-icon" src={settingIcon}></img>;      
      break;
    case 2: // 체크
      optBTn = <img className="opt-icon" src={checkIcon}></img>;      
      break;
    default:
      optBTn = <></>
      break;
  }

  let arrowBtn = backVisible?<div className="back-btn"><img className="back-icon" src={arrowLeft} /></div>:<></>


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
        <div className="opt-btn">
          {optBTn}
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
