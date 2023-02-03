import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
/* img src import */
import arrowRight from "../../assets/GlobalAsset/arrow-right.png";
import userSample from "../../assets/DummyData/writerProfileSample.png";

/* color.js */
import { COLORS } from "../../styles/colors";

/* css import */
import "./PostItem.css";

/** */
const PostItem = ({ mood, userName, postId }) => {
  const testURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM_1pnOJt_sEd1qODO-oTkU_DAbzeQirV7GrFZIaD&s";
  const testText =
    "소설에 대한 사전적 정의는 '사실 또는 작가의 상상력에 바탕을 두고 허구적으로\n 이야기를 꾸며 나간 산문체의 문학 양식. 일정한 구조 속에서\n 배경과 등장인물의 행동, 사상, 심리 따위를 통하여 인간의 모습이나 사회상을 드러낸다. 분량에 따라 장편ㆍ중편ㆍ단편으로, 내용에 따라 과학 소설ㆍ역사 소설ㆍ추리 소설 따위로 구분할 수 있으며, 옛날의 설화나 서사시 따위의 전통을 이어받아 근대에 와서 발달한 문학 양식이다.', '소설이 실린 책.', '사실이나 허구의 이야기를 작가의 상상력과 구성력을 가미하여 산문체로 쓴 문학의 한 갈래.',\n '소설이 실린 책.'이라고 정의하고 있습니다.";
  return (
    <>
      <div className="post-item" id='postlist'>
        <div className="img-container" style={{ backgroundImage: `url(${testURL})` }}>
          <div className="filter">
            <div className="arrow-div" style={{ backgroundColor: "yellow" }}></div>
            <div className="text-content">{testText}</div>
          </div>
          <div className="filter"></div>
        </div>
        <div className="bottom-text-container">
          <div className="user-info-container">
            <div className="user-info-div">
              <img src={userSample}></img>
              <div className="text-div">
                <p className="user-name">Olivia</p>
                <p className="time-log">
                  45분 전<span>☀️</span>
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
      </div>
    </>
  );
};

export default PostItem;
