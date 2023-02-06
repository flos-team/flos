import axios from "axios";

// /* libraray */
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import styled from "@emotion/styled";

/* import react */
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
/* import img */
import groomImg from "../../assets/GlobalAsset/groom-img.png"
import groomGlassImg from "../../assets/GlobalAsset/groom-glass-img.png";
import sunny128 from "../../assets/GlobalAsset/sunny-128.png";
import cloudy128 from "../../assets/GlobalAsset/cloudy-128.png";
import rainy128 from "../../assets/GlobalAsset/rainy-128.png";
import angleLeft128 from "../../assets/GlobalAsset/angle-left-128.png";
import angleRight128 from "../../assets/GlobalAsset/angle-right-128.png";

/* import component */

/* import module */

/* import css */
import "./PostResultModal.css";

const PostResultModal = () => {
    const swiper = useSwiper();

    const [imgList, setImgList] = useState([sunny128, cloudy128, rainy128]);
    const [weatherImg, setWeatherImg] = useState(null);
    const [imgIdx, setImgIdx] = useState(0);
    useEffect(() => {
        // 날씨 API가 적용되어야 할 곳
        setWeatherImg(imgList[0]);
    },[])

    const handleOnRightClick = () => {
        // [length + a] % lenth
        // let length = imgList.length;
        // setImgIdx((imgIdx + 1) % length);        
        // setWeatherImg(imgList[imgIdx]);
        // swiper.slideNext();

    }
    const handleOnLeftClick = () => {
        // let length = imgList.length;
        // setImgIdx((length+imgIdx - 1) % length);        
        // setWeatherImg(imgList[imgIdx]);        
        // swiper.slidePrev();
    }
    const flowerFullList = imgList.map((e, i) => <SwiperSlide><div key={i} className="weather-img" style={{ backgroundImage: `url(${e})` }}></div></SwiperSlide>);
    const swiperClass = {
        width: "200px",
        height: "130px"
    }

    return (
        <div className="post-result-modal-container">
            <div className="post-result-modal">
                <div className="groom-img-cotainer" style={{backgroundImage:`url(${groomImg})`}}>
                    <img/>
                </div>
                <div className="result-text-div">
                    <p>구름이가 당신의 이야기를 듣고 <b>햇살</b> 같다고 생각했어요</p>
                </div>
                <div className="result-guide-text">
                    <p>감정 결과는 좌우 스와이프를 통해 수정할 수 있습니다.</p>
                </div>
                <div className="emotion-modify-div">
                    <div className="angle-left-btn" style={{backgroundImage:`url(${angleLeft128})`}} onClick={(e)=>{swiper.slideNext()}}></div>
                    {/* <div className="weather-img" style={{backgroundImage:`url(${weatherImg})`}}></div> */}
                    <Swiper
                        modules={[ Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={1}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={true}
                        onSlideChange={(e) => console.dir("hey")}
                        onSwiper={() => console.log("hey")}
                        style={swiperClass}
                        >
                        {flowerFullList}
                    </Swiper>
                    <div className="angle-right-btn" style={{backgroundImage:`url(${angleRight128})`}} onClick={(e)=>{swiper.slidePrev()}}></div>
                </div>
                <div className="confirm-btn">
                    <p>작성완료</p>
                </div>
            </div>
            <div className="background"></div>
        </div>
    )
}

export default PostResultModal;