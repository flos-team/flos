import { useState } from "react";

/* import css */
import "./PostDeletAlertModal.css";

const DangerAlertModal = () => {
  return (
    <>
      <div className="post-delete-modal">
        <div className="post-delete-modal-header">
          <p>정말 글을 삭제하시겠어요?</p>
        </div>
        <div className="post-delete-modal-footer">
          <div className="cancel-btn">
            <p>아니오</p>
          </div>
          <div className="delete-btn">
            <p>네</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DangerAlertModal;
