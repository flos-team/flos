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
import commentProfileSample from "../../assets/DummyData/commentProfileSample.png";

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
// const PostItem = ({ postId, writerNickname, weather, regDate, content, tagList }) => {
const PostItem = ({ post }) => {
  const testURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM_1pnOJt_sEd1qODO-oTkU_DAbzeQirV7GrFZIaD&s";
  let postDay = dayjs(post.regDate, "YYYY-MM-DD HH:mm:ss");
  let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
  let RegBefore = getTimeDiffText(postDay, curDay);

  // 화면 렌더링 시
  // 포스트 감정상테에 따라 이미지 로딩을 다르게!

  const [bgColor, setBgColor] = useState("#fff");
  const [weatherImg, setWeatherImg] = useState(<div></div>);

  // console.log(post.postRelationDTO.attachFiles);
  const imgs = post.postRelationDTO.attachFiles.map(({ saveName }) => (
    <div
      className="img-div"
      style={{
        backgroundImage: `url(https://i8b210.p.ssafy.io/api/file/${saveName})`,
        // backgroundImage: `url(${testURL})`,
      }}
    ></div>
  ));

  // console.log(post.postRelationDTO.attachFiles[0]);
  let thumbNailURL = ""; 
  let thumbNail = null;
  if(post.postRelationDTO.attachFiles[0]){
    thumbNailURL = "https://i8b210.p.ssafy.io/api/file/" +post.postRelationDTO.attachFiles[0].saveName;
    console.log(thumbNail)
    thumbNail = (
      <img src={thumbNailURL}></img>
    )
  }

  const tags = post.postRelationDTO.tagList.map(({ key, tagName }) => (
    <div className="tag">
      {key}
      {tagName}
    </div>
  ));

  useEffect(() => {
    switch (post.weather) {
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
  }, [post.weather]);

  if (post) {
    return (
      <>
        <div className="post-item" id={`${post.id}`}>
          {/* <div
            className="img-container hide-scroll"
            style={{
              backgroundImage: `url(https://i8b210.p.ssafy.io/api/file/20230205/test1.jpg)`,
            }}
            >
            </div> */}
          {thumbNailURL === "" ? "" : thumbNail}
          {/* <div className="filter">
            <div className="arrow-div" style={{ backgroundColor: bgColor }}></div>
            <div className="text-content">{content}</div>
          </div> */}
          {/* <div className="filter"></div> */}

          <Link to={`post/${post.id}`}>
            <div
              className="bottom-text-container"
              style={{ backgroundColor: bgColor }}
            >
              <div className="user-info-container">
                <div className="user-info-div">
                  <img src={userSample}></img>
                  <div className="text-div">
                    <p className="user-name">{post.writer.nickname}</p>
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
              <div className="text-container">
                <p>{post.content}</p>
              </div>
              <div className="tag-container hide-scroll">
                {/* 태그가 여러 개일 경우 그에 맞춰 배열 조정 必 */}
                {tags ? tags : ""}
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }
};

export default PostItem;
