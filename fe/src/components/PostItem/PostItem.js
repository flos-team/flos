/**
 * @author 1-hee, tykimdream
 *
 * @copyright 2023
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
/* img src import */
import arrowRight from "../../assets/GlobalAsset/arrow-right.png";
import userSample from "../../assets/DummyData/writerProfileSample.png";
import sunnyImg from "../../assets/GlobalAsset/sunny.png";
import cloudyImg from "../../assets/GlobalAsset/cloudy.png";
import rainyImg from "../../assets/GlobalAsset/rainy.png";
import questionMark from "../../assets/ProfileAsset/question-mark.png";

import dayjs from "dayjs";
import { getTimeDiffText } from "../../api/DateModule";
/* color.js */
import { COLORS } from "../../styles/colors";
/* css import */
import "./PostItem.css";

/**
 * @param {number} postId 포스트아이디
 * @param {string} writerNickname 사용자 닉네임
 * @param {Enum} weather 게시글의 감정상태 Enum
 * @param {Date} regDate 게시글 작성 날짜
 * @param {string} content 게시글 내용
 * @param {Array:Object} tagList 태그 리스트
 */
const PostItem = ({ postId, writerNickname, weather, regDate, content, tagList }) => {
  const testURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM_1pnOJt_sEd1qODO-oTkU_DAbzeQirV7GrFZIaD&s";
  let postDay = dayjs(regDate, "YYYY-MM-DD HH:mm:ss");
  let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
  let RegBefore = getTimeDiffText(postDay, curDay);

  // 포스트 태그 리스트
  const [postTagList, setPostTagList] = useState([...Array(10)].map((e) => <div className="tag">프록시</div>));
  // 화면 렌더링 시
  // 포스트 감정상테에 따라 이미지 로딩을 다르게!

  const [bgColor, setBgColor] = useState("#fff");
  const [weatherImg, setWeatherImg] = useState(<></>);

  useEffect(() => {
    switch (weather) {
      case "SUNNY":
        setWeatherImg(<img src={sunnyImg} />);
        setBgColor(COLORS.yellowP);
        break;
      case "CLOUDY":
        setWeatherImg(<img src={cloudyImg} />);
        setBgColor(COLORS.mono200);
        break;
      case "RAINY":
        setWeatherImg(<img src={rainyImg} />);
        setBgColor(COLORS.blueP);
        break;
      default:
        setWeatherImg(<img src={questionMark} />);
        setBgColor(COLORS.white);
        break;
    }
  }, [weather]);
  return (
    <>
      <div className="post-item" id={`${postId}`}>
        <div className="img-container" style={{ backgroundImage: `url(${testURL})` }}>
          <div className="filter">
            <div className="arrow-div" style={{ backgroundColor: bgColor }}></div>
            <div className="text-content">{content}</div>
          </div>
          <div className="filter"></div>
        </div>
        <Link to={`post/${postId}`}>
          <div className="bottom-text-container">
            <div className="user-info-container">
              <div className="user-info-div">
                <img src={userSample}></img>
                <div className="text-div">
                  <p className="user-name">{writerNickname}</p>
                  <p className="time-log">
                    {RegBefore}
                    {weatherImg}
                  </p>
                </div>
              </div>
              <div className="more-btn">
                <div className="text-div">
                  <p>더보기</p>
                </div>
                <div className="arrow-div">
                  <img src={arrowRight} />
                </div>
              </div>
            </div>
            <div className="tag-container">
              {/* 태그가 여러 개일 경우 그에 맞춰 배열 조정 必 */}
              {postTagList}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PostItem;
