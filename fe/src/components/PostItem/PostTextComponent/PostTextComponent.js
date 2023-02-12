// /* libraray */
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import styled from "@emotion/styled";

/* import react */
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* import img */

/* import component */

/* import module */
import COLORS from "../../../styles/colors";

/* import css */
import "./PostTextComponent.css";

/**
 *
 * @param {string} content 게시글 본문
 * @returns
 */
// userImg, userNickname, timeLog, weather, tagList
const PostTextComponent = ({ content }) => {
  //   console.log(content);
  return (
    <div className="post-text-container">
      <div className="text-div">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PostTextComponent;
