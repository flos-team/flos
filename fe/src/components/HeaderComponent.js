import { useState } from "react";

/* import image assets */
import angleLeft from "../assets/GlobalAsset/fi-br-angle-left.png";
import notification from "../assets/GlobalAsset/notification.png";
import settingBtn from "../assets/ProfileAsset/setting-btn.png";

/* import css */
import "./HeaderComponent.css";

const HeaderComponent = ({ backVisible, pageName, optType }) => {
  /* 뒤로갈 페이지가 있을 경우 arrow 표시 */
  const backImg = backVisible ? <img src={angleLeft}></img> : <></>;
  /* props로 들어오는 optType(int) 에 따라 상단 옵션 버튼이 달라짐 */
  let imgSrc = null;
  switch (optType) {
    case 0:
      imgSrc = notification;
      break;
    case 1:
      imgSrc = settingBtn;
      break;
    default:
      imgSrc = notification;
      break;
  }
  return (
    <>
      <div className="page-header">
        <div className="title-bar">
          {backImg}
          <p>{pageName}</p>
        </div>
        <div className="btn-div">
          <img className="option-btn" src={imgSrc}></img>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
