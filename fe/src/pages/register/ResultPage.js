import React from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import TextLogoComponent from "../../components/TextLogoComponent";


// import Sample from "../../assets/DummyData/dummy-sample.jpg"
import Sample from "../../assets/DummyData/EndingGIF.gif"

// import styles from "./ResultPage.module.css";

import "./Result.css";

function ResultPage() {
  return (
    <div>
      <HeaderComponent
        backVisible={true}
        pageName={"회원가입"}
        optType={""}
      ></HeaderComponent>
      <TextLogoComponent></TextLogoComponent>
      <div>
        <Link to="/login">
          <div className="result-container">
            <div className="result-complete-text">회원가입 완료</div>
            <img className="result-img" src = {Sample}></img>
            <div className="result-greet-text">flos에 오신 것을 환영합니다.</div>
            <div className="result-login-text blinking">로그인하러가기</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ResultPage;
