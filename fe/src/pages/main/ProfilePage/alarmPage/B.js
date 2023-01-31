import { useState } from "react";

/* img assets */
import arrowLeft from "../../../../assets/GlobalAsset/arrow-left.png";

/* import component */
import ToggleBtn from "../../../../components/ToggleBtn";

/* css */
import "./AlarmPage.css";

const AlarmPage = () => {
  const [alarmOptItems, setAlarmOptItems] = useState([
    { optId: 1, optName: "새글 알림" },
    { optId: 2, optName: "이메일 알림" },
    { optId: 3, optName: "댓글 알림" },
    { optId: 4, optName: "마을 날씨 알림" },
    { optId: 5, optName: "나의 정원 알림" },
  ]);
  // 옵션 리스트
  const alarmOptList = alarmOptItems.map(({ optId, optName }) => (
    <div key={optId} className="alarm-ops-item">
      <div>
        <p>{optName}</p>
      </div>
      <ToggleBtn></ToggleBtn>
    </div>
  ));

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
      <div className="alarm-main">{alarmOptList}</div>
    </div>
  );
};

export default AlarmPage;
