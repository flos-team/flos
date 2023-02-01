import { useState } from "react";

/* img assets */
import arrowLeft from "../../../../assets/GlobalAsset/arrow-left.png";

/* import component */
import ToggleBtn from "../../../../components/ToggleBtn/ToggleBtn";

/* css */
import "./ThemePage.css";

const ThemePage = () => {
  const [themeOptItems, setThemeOptItems] = useState([
    { optId: 1, optName: "시스템 설정에 맞춤" },
    { optId: 2, optName: "다크 모드" },
  ]);
  // 옵션 리스트
  const themeOptList = themeOptItems.map(({ optId, optName }) => (
    <div key={optId} className="theme-ops-item">
      <div>
        <p>{optName}</p>
      </div>
      <ToggleBtn></ToggleBtn>
    </div>
  ));

  return (
    <div className="theme-page">
      <div className="theme-header">
        <div className="back-profile-btn">
          <img src={arrowLeft} />
        </div>
        <div className="page-title">
          <p>테마설정</p>
        </div>
      </div>
      <div className="theme-main">{themeOptList}</div>
    </div>
  );
};

export default ThemePage;
