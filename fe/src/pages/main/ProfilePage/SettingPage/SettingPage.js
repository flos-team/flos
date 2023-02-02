/* import component */
import ToggleBtn from "../../../../components/ToggleBtn/ToggleBtn";

import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
/* css */
import "./SettingPage.css";

const AlarmPage = () => {
  const alarmOptItems = [
    { optId: 1, optName: "새글 알림" },
    { optId: 2, optName: "이메일 알림" },
    { optId: 3, optName: "댓글 알림" },
    { optId: 4, optName: "마을 날씨 알림" },
    { optId: 5, optName: "나의 정원 알림" },
  ]

  const themeOptItems = [
    { optId: 1, optName: "시스템 설정에 맞춤" },
    { optId: 2, optName: "다크 모드" },
  ]

  // 알림 설정 리스트
  const alarmOptList = alarmOptItems.map(({ optId, optName }) => (
    <div key={optId} className="alarm-ops-item">
      <div>
        <p>{optName}</p>
      </div>
      <ToggleBtn></ToggleBtn>
    </div>
  ));
  
  // 테마 설정 리스트
  const themeOptList = themeOptItems.map(({ optId, optName }) => (
    <div key={optId} className="alarm-ops-item">
      <div>
        <p>{optName}</p>
      </div>
      <ToggleBtn></ToggleBtn>
    </div>
  ));

  return (
    <div className="alarm-page">
      <HeaderComponent backVisible={true} pageName={"설정"}></HeaderComponent>
      알림 설정
      <div className="alarm-main">{alarmOptList}</div>
      테마 설정
      <div className="alarm-main">{themeOptList}</div>
      <div>로그아웃</div>
    </div>
  );
};

export default AlarmPage;
