// import { jsx } from "@emotion/react";

/* import component */

/* import css */

import "./AlarmItemHeader.css";
/**
 * @param {ImageBitmap} AlarmImg 알람 왼쪽에 배치될 이미지 비트맵 파일
 * @param {jsx} AlarmTextJSX 알람 내용 JSx
 * @param {string} AlarmTimeLog 알림 발생 시점
 *
 * @returns  {void}
 */

const AlarmItemHeader = ({ AlarmImg, AlarmTextJSX, AlarmTimeLog }) => {
  return (
    <>
      <div className="alarm-header-div">
        <img alt="AlarmImg" src={AlarmImg} />
        <div className="alarm-text-div">
          <p className="alarm-text">
            {AlarmTextJSX instanceof String ? (
              <>{AlarmTextJSX}</>
            ) : (
              AlarmTextJSX
            )}
          </p>
          <p className="alarm-time-log">{AlarmTimeLog}</p>
        </div>
      </div>
    </>
  );
};

export default AlarmItemHeader;
