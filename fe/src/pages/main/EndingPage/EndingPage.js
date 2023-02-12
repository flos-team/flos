/* import react */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* import lib */
import { Swiper, SwiperSlide } from "swiper/react";

/* import img */

/* import module */

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import LetterStep1Component from "../../../components/EndingLetterCompoents/LetterStep1Component/LetterStep1Component";
import LetterStep2Component from "../../../components/EndingLetterCompoents/LetterStep2Component/LetterStep2Component";
import LetterStep3Component from "../../../components/EndingLetterCompoents/LetterStep3Component/LetterStep3Component";
import LetterStep4Component from "../../../components/EndingLetterCompoents/LetterStep4Component/LetterStep4Component";

/* import css */
import "./EndingPage.css";

const EndingPage = () => {
  const swiperRef = useRef(1);
  const swiperClass = {
    width: "100%",
    height: "100%",
  };
  const navigate = useNavigate();
  const [endingList, setEndingList] = useState([]);

  useEffect(() => {
    let list = [<LetterStep1Component />, <LetterStep2Component />, <LetterStep3Component />, <LetterStep4Component />];
    setEndingList(list.map((e, i) => <SwiperSlide key={i}>{e}</SwiperSlide>));
  }, []);
  return (
    <>
      <HeaderComponent backVisible={true} pageName={"엔딩페이지"}></HeaderComponent>
      <div className="ending-page">
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            if (swiper.realIndex === endingList.length - 1) {
              console.log("타이머 시작 3초후 메인으로 이동합니다.");
              setTimeout(() => {
                navigate("/main");
              }, 3000);
            }
          }}
          style={swiperClass}
          ref={swiperRef}
          direction={"vertical"}
        >
          {endingList}
        </Swiper>
      </div>
    </>
  );
};

export default EndingPage;
