/* import react */
import { useState } from "react";

/* import img */
import userImg from "../../../../assets/GlobalAsset/user-img.png";

/* import component */
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";
/* import lib */

/* import css */
import "./ProfileModifyPage.css";

const ProfileModifyPage = () => {
  return (
    <>
      <HeaderComponent backVisible={true} pageName={"프로필 편집"}></HeaderComponent>
      <div>ProfileModifyPage</div>
    </>
  );
};

export default ProfileModifyPage;
