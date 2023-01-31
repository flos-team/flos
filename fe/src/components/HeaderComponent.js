import { useState } from "react";

/* import image assets */
import angleLeft from "../assets/GlobalAsset/fi-br-angle-left.png";
import notification from "../assets/GlobalAsset/notification.png";
import settingBtn from "../assets/ProfileAsset/setting-btn.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/* import css */
import "./HeaderComponent.css";
/** backVisible((bool)true, false) : 뒤로 가기 표시, pageName((string)현재 페이지 이름) : 현재 페이지 이름, optType((int) 0 : noti Icon, 1 : setting Icon)
 */
const HeaderComponent = ({ backVisible, pageName, optType }) => {
  const navigate = useNavigate();

  /* 뒤로갈 페이지가 있을 경우 arrow 표시 */
  const backImg = backVisible ? (
    <img src={angleLeft} onClick={() => navigate(-1)}></img>
  ) : (
    <></>
  );
  const notificationCase = (
    <Link to="/notification">
      <div className="btn-div">
        <img className="option-btn" src={notification}></img>
      </div>
    </Link>
  );

  const settingCase = (
    <Link to="/settings">
      <div className="btn-div">
        <img className="option-btn" src={settingBtn}></img>
      </div>
    </Link>
  );
  /* props로 들어오는 optType(int) 에 따라 상단 옵션 버튼이 달라짐 */
  // let imgSrc = null;
  let btnSelected = (<></>);
  switch (optType) {
    case 0:
      btnSelected = notificationCase;
      break;
    case 1:
      btnSelected = settingCase;
      break;
    default:
      btnSelected = '';
      break;
  }

  
  return (
    <>
      <div className="page-header">
        <div className="page-div">
          <div className="title-bar">
            {backImg}
            <p>{pageName}</p>
          </div>
          {btnSelected}
        </div>          
      </div>
    </>
  );
};

export default HeaderComponent;
