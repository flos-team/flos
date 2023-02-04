import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
/* img src import */
import arrowRight from "../../assets/GlobalAsset/arrow-right.png";
import userSample from "../../assets/DummyData/writerProfileSample.png";

import dayjs from "dayjs";

import { getTimeDiffText } from "../../api/DateModule";

/* color.js */
import { COLORS } from "../../styles/colors";

/* css import */
import "./PostItem.css";

/** */
const PostItem = ({ postId, writer, weather, regDate, content }) => {
  const testURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM_1pnOJt_sEd1qODO-oTkU_DAbzeQirV7GrFZIaD&s";
  let postDay = dayjs(regDate, "YYYY-MM-DD HH:mm:ss");
  let curDay = dayjs(new Date(), "YYYY-MM-DD HH:mm:ss");
  let RegBefore = getTimeDiffText(postDay, curDay);
  return (
    <>
      <div className="post-item" id={`${postId}`}>
        <div
          className="img-container"
          style={{ backgroundImage: `url(${testURL})` }}
        >
          <div className="filter">
            <div
              className="arrow-div"
              style={{ backgroundColor: "yellow" }}
            ></div>
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
                  <p className="user-name">{writer.nickname}</p>
                  <p className="time-log">
                    {RegBefore}
                    <span>☀️</span>
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
              <div className="tag">프록시</div>
              <div className="tag">프록시</div>
              <div className="tag">프록시</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PostItem;
