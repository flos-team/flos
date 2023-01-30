import { useState } from "react";

/* import img asset */

/* import css asset */
import "./LogoutModal.css";

const LogoutModal = () => {
  return (
    <>
      <div className="logout-modal">
        <div className="logout-modal-header">
          <p>정말 로그아웃 하시겠어요?</p>
        </div>
        <div className="logout-modal-footer">
          <div className="cancel-btn">
            <p>취소</p>
          </div>
          <div className="logout-btn">
            <p>로그아웃</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
