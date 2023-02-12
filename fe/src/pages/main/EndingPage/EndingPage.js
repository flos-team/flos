/* import react */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* import lib */
import { Swiper, SwiperSlide } from "swiper/react";

/* import img */
import flowerRed from "../../../assets/EndingAsset/flower-red.png";
import flowerOrange from "../../../assets/EndingAsset/flower-orange.png";
import flowerYellow from "../../../assets/EndingAsset/flower-yellow.png";
import flowerPurple from "../../../assets/EndingAsset/flower-purple.png";
import flowerPink from "../../../assets/EndingAsset/flower-pink.png";
import flowerWhite from "../../../assets/EndingAsset/flower-white.png";
// 망고 TODO...
// 자몽 TODO...
import flowerGreen from "../../../assets/EndingAsset/flower-green.png";
import flowerBlue from "../../../assets/EndingAsset/flower-blue.png";
import Swal from "sweetalert2";

/* import module */
import {
  getFlowerInfo,
  getGardenList,
  createFlower,
  giveSun,
  giveRain,
  flowering,
  modifyFlower,
} from "../../../api/FlowerAPI";

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import LetterStep1Component from "../../../components/EndingLetterCompoents/LetterStep1Component/LetterStep1Component";
import LetterStep2Component from "../../../components/EndingLetterCompoents/LetterStep2Component/LetterStep2Component";
import LetterStep3Component from "../../../components/EndingLetterCompoents/LetterStep3Component/LetterStep3Component";
import LetterStep4Component from "../../../components/EndingLetterCompoents/LetterStep4Component/LetterStep4Component";

/* import css */
import "./EndingPage.css";

const EndingPage = () => {
  const [flowerInfoList, setFlowerInfoList] = useState([
    {
      color: "red",
      name: "빨간 튤립",
      means: ["사랑의 고백", "열정적인 사랑"],
      img: flowerRed,
    },
    {
      color: "orange",
      name: "주황 튤립",
      means: ["매혹", "온정", "수줍음", "부끄러움"],
      img: flowerOrange,
    },
    ,
    {
      color: "yellow",
      name: "노랑 튤립",
      means: ["헛된 사랑", "이루어질 수 없는"],
      img: flowerYellow,
    },
    {
      color: "purple",
      name: "보라 튤립",
      means: ["영원한 사랑", "영원하지 않은 사랑"],
      img: flowerPurple,
    },
    {
      color: "pink",
      name: "핑크 튤립",
      means: ["사랑의 시작", "애정", "배려"],
      img: flowerPink,
    },
    {
      color: "white",
      name: "하얀 튤립",
      means: ["과거의 우정", "실연", "추억", "새로운 시작", "순결"],
      img: flowerWhite,
    },
    {
      color: "mango", // 에셋 없음
      name: "망고 튤립",
      means: ["수줍은 사랑의 표시", "매혹적인 사랑"],
    },
    {
      color: "grapefruit", // 에셋 없음
      name: "자몽 튤립",
      means: ["사랑의 고백"],
    },
    {
      color: "green",
      name: "초록 튤립",
      means: ["아름다운 눈"],
      img: flowerGreen,
    },
    {
      color: "blue",
      name: "파란 튤립",
      means: ["사랑합니다 여러분"],
      img: flowerBlue,
    },
  ]);
  const [flowerObj, setFlowerObj] = useState({
    color: "",
    img: "",
    means: [],
    name: "",
  });

  const swiperRef = useRef(1);
  const swiperClass = {
    width: "100%",
    height: "100%",
  };
  const navigate = useNavigate();
  const [endingList, setEndingList] = useState([]);

  useEffect(() => {
    getFlowerInfo().then((res) => {
      let flowerRenderObj;
      L: for (let i = 0; i < flowerInfoList.length; i++) {
        let obj = flowerInfoList[i];
        if (obj) {
          if (obj.color == res.color) {
            flowerRenderObj = obj;
            break L;
          }
        }
      }
      //console.dir(res);
      // console.dir(flowerRenderObj);
      setFlowerObj(flowerRenderObj);
      let list = [
        <LetterStep1Component
          flowerImg={flowerRenderObj.img}
          flowerMeans={flowerRenderObj.means}
          flowerName={flowerRenderObj.name}
        />,
        <LetterStep2Component />,
        <LetterStep3Component />,
        <LetterStep4Component />,
      ];
      setEndingList(list.map((e, i) => <SwiperSlide key={i}>{e}</SwiperSlide>));
    });
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
              console.log("타이머 시작!");
              setTimeout(() => {
                let timerInterval;
                Swal.fire({
                  title: "메인 페이지로 이동합니다.",
                  html: "<b></b> 초 후 창이 닫힙니다.",
                  timer: 3000,
                  timerProgressBar: true,
                  showCancelButton: true,
                  cancelButtonText: "취소",
                  didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector("b");
                    timerInterval = setInterval(() => {
                      b.textContent = Swal.getTimerLeft();
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  },
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    navigate("/main", { replace: true });
                  } else {
                    Swal.fire("타이머가 취소되었습니다.");
                  }
                });
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
