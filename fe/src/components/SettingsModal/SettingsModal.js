import { useState } from "react";

/* img assets */

/* css assets */
import "./SettingsModal.css";

const SettingsModal = () => {
  return (
    <div className="setting-modal">
      <div className="setting-item">
        <p>알림설정</p>
      </div>
      <div className="setting-item">
        <p>테마설정</p>
      </div>
      <div className="setting-item">
        <p>로그아웃</p>
      </div>
    </div>
  );
};

export default SettingsModal;
