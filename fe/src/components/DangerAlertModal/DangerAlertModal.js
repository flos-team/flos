import { useState } from "react";

/* import css */
import "./DangerAlertModal.css";

const DangerAlertModal = ({ message, positive, negative, setIsOpen }) => {
  return (
    <>
      <div className="danger-alert-modal-container">
        <div
          className="danger-alert-modal-bg"
          onClick={(e) => {
            setIsOpen();
          }}
        ></div>
        <div className="danger-alert-modal">
          <div className="danger-alert-modal-header">
            <p>{message}</p>
          </div>
          <div className="danger-alert-modal-footer">
            <div
              className="positive-btn"
              onClick={(e) => {
                setIsOpen();
              }}
            >
              <p>{positive}</p>
            </div>
            <div className="negative-btn">
              <p>{negative}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DangerAlertModal;
