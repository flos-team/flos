/* import component */
import ToggleBtn from "../../../../components/ToggleBtn/ToggleBtn";

import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
/* css */
import "./SettingPage.css";

const AlarmPage = () => {
  const alarmOptItems = [
    { optId: 0, optName: "알림 설정" },
    { optId: 1, optName: "새글 알림" },
    { optId: 2, optName: "이메일 알림" },
    { optId: 3, optName: "댓글 알림" },
    { optId: 4, optName: "마을 날씨 알림" },
    { optId: 5, optName: "나의 정원 알림" },
  ];

  const themeOptItems = [
    { optId: 0, optName: "테마 설정" },
    { optId: 1, optName: "시스템 설정에 맞춤" },
    { optId: 2, optName: "다크 모드" },
  ];

  // 알림 설정 리스트
  const alarmOptList = alarmOptItems.map(({ optId, optName }) => {
    let modifiedClassName = `alarm-ops-item ${optId === 0 ? "title" : ""}`;
    let optDiv = (
      <div key={optId} className={modifiedClassName}>
        <div>
          <p>{optName}</p>
        </div>
        {optId !== 0 ? <ToggleBtn></ToggleBtn> : <></>}
      </div>
    );
    return optDiv;
  });

  // 테마 설정 리스트
  const themeOptList = themeOptItems.map(({ optId, optName }) => {
    let modifiedClassName = `alarm-ops-item ${optId === 0 ? "title" : ""}`;
    let optDiv = (
      <div key={optId} className={modifiedClassName}>
        <div>
          <p>{optName}</p>
        </div>
        {optId !== 0 ? <ToggleBtn></ToggleBtn> : <></>}
      </div>
    );
    return optDiv;
  });

  return (
    <div className="alarm-page">
      <HeaderComponent backVisible={true} pageName={"설정"}></HeaderComponent>
      <div className="alarm-main">{alarmOptList}</div>
      <div className="alarm-main">{themeOptList}</div>
      <div className="logout-container">
        <div>이용 약관</div>
        <div className="logout-btn">로그아웃</div>
      </div>
    </div>
  );
};

export default AlarmPage;
