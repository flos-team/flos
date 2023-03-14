// /* libraray */
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import styled from "@emotion/styled";

/* import react */
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import img */
import sampleImg from "../../../assets/DummyData/commentProfileSample.png"

/* import component */

/* import module */

/* import css */
import "./PostPhotoComponent.css";

/**
 * 
 * @param {Array:string} imgURLList 게시글의 이미지 주소가 담긴 string 배열
 * @returns 
 */
// userImg, userNickname, timeLog, weather, tagList
const PostPhotoComponent = ({ imgURLList, testURL }) => {
    const [imgBaseURL, setImgBaseURL] = useState("********");
    const [thumbImgURL, setThumbImgURL] = useState(`********${imgURLList[0].saveName}`); // 수정
    return (<>
        <div className="post-img-container" style={{ backgroundImage: `url(********${imgURLList[0].saveName})` }}>
            
        </div>
    </>)
}

export default PostPhotoComponent;
