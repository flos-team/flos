import axios from "axios";

// /* libraray */
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import styled from "@emotion/styled";

/* import react */
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
/* import img */
import groomSmile from "../../assets/GoormAsset/goorm-smile.png";
import groomSoso from "../../assets/GoormAsset/goorm-soso.png";
import goormSad from "../../assets/GoormAsset/goorm-sad.png";
import sunny128 from "../../assets/GlobalAsset/sunny-128.png";
import cloudy128 from "../../assets/GlobalAsset/cloudy-128.png";
import rainy128 from "../../assets/GlobalAsset/rainy-128.png";
import angleLeft128 from "../../assets/GlobalAsset/angle-left-128.png";
import angleRight128 from "../../assets/GlobalAsset/angle-right-128.png";

/* import component */
import Swal from "sweetalert2";

/* import module */
import COLORS from "../../styles/colors";

/* import css */
import "./PostResultModal.css";

const PostResultModal = ({ setVisible, moveMain, weatherIdx, createPost, judgeWeatherIdx }) => {
  const swiperRef = useRef(null);
  const imgList = [sunny128, cloudy128, rainy128];
  const handleOnRightClick = () => {
    swiperRef.current.swiper.slideNext(500);
  };
  const handleOnLeftClick = () => {
    swiperRef.current.swiper.slidePrev(500);
  };
  const weatherList = imgList.map((e, i) => (
    <SwiperSlide key={i}>
      <div key={i} className="weather-img" style={{ backgroundImage: `url(${e})` }}></div>
    </SwiperSlide>
  ));
  const weatherTextList = ["햇살", "구름", "비구름"];
  const weatherImgList = [groomSmile, groomSoso, goormSad];
  const [weatherTextIdx, setWeatherTextIdx] = useState(0);
  const [weatherTextColorIdx, setWeatherTextColorIdx] = useState(0);
  const weatherTextColorList = [COLORS.yellowP, COLORS.mono300, COLORS.skyBlueP];

  const swiperClass = {
    width: "150px",
    height: "128px",
  };

  const switchResult = () => {
    // console.log(swiperRef.current.swiper.realIndex);
    switch (swiperRef.current.swiper.realIndex) {
      case 0:
        judgeWeatherIdx("positive");
        break;
      case 1:
        judgeWeatherIdx("neutral");
        break;
      case 2:
        judgeWeatherIdx("negative");
        break;
      default:
        judgeWeatherIdx("neutral");
        break;
    }
    // judgeWeatherIdx()
  };

  useEffect(() => {
    //console.dir(swiperRef.current.swiper);
    swiperRef.current.swiper.slideTo(weatherIdx, 500, false);
  }, []);

  return (
    <div className="post-result-modal-container">
      <div className="post-result-modal">
        <div className="groom-img-cotainer" style={{ backgroundImage: `url(${weatherImgList[weatherIdx]})` }}>
          <img />
        </div>
        <div className="result-text-div">
          <p>
            구름이가 당신의 이야기를 듣고{" "}
            <b style={{ color: weatherTextColorList[weatherTextColorIdx] }}>{weatherTextList[weatherTextIdx]}</b> 같다고
            생각했어요
          </p>
        </div>
        <div className="result-guide-text">
          <p>감정 결과는 좌우 스와이프를 통해 수정할 수 있습니다.</p>
        </div>
        <div className="emotion-modify-div">
          <div
            className="angle-left-btn"
            style={{ backgroundImage: `url(${angleLeft128})` }}
            onClick={(e) => {
              handleOnLeftClick();
            }}
          ></div>
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            pagination={true}
            navigation
            loop={true}
            onSlideChange={(swiper) => {
              let idx = swiper.realIndex;
              setWeatherTextIdx(idx);
              setWeatherTextColorIdx(idx);
              // console.log(idx);
              switchResult();
            }}
            style={swiperClass}
            ref={swiperRef}
          >
            {weatherList}
          </Swiper>
          <div
            className="angle-right-btn"
            style={{ backgroundImage: `url(${angleRight128})` }}
            onClick={(e) => {
              handleOnRightClick();
            }}
          ></div>
        </div>
        <div
          className="confirm-btn"
          onClick={async (e) => {
            await createPost();

            moveMain();
          }}
        >
          <p>작성완료</p>
        </div>
      </div>
      <div
        className="background"
        onClick={(e) => {
          setVisible(false);
        }}
      ></div>
    </div>
  );
};

export default PostResultModal;
