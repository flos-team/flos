import { useState } from "react";

/* component */
import LogoutModal from "../../components/LogoutModal";
import SettingsModal from "../../components/SettingsModal";

/* img asset */
import arrowLeft from "../../assets/GlobalAsset/arrow-left.png";

/* import css */
import "./TestPage.css";

const TestPage = () => {
  return (
    <div className="alarm-page">
      <div className="alarm-header">
        <div className="back-profile-btn">
          <img src={arrowLeft} />
        </div>
        <div className="page-title">
          <p>알림설정</p>
        </div>
      </div>
      <div className="alarm-main"></div>
    </div>
  );
};

export default TestPage;
