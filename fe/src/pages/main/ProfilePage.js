import { render } from "@testing-library/react";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <div className="user-info-header">
        <img className="user-profile-img"></img>
        <p className="user-nickname">wonny</p>
        <div className="user-today-mood">무드</div>
      </div>
    </>
  );
};

export default ProfilePage;
