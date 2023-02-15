/* import react */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { getGardenList, getFlowerInfoById, getFlowerMVPInfo, writeEndLetter } from "../../../api/FlowerAPI";

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import LetterStep1Component from "../../../components/EndingLetterCompoents/LetterStep1Component/LetterStep1Component";
import LetterStep2Component from "../../../components/EndingLetterCompoents/LetterStep2Component/LetterStep2Component";
import LetterStep3Component from "../../../components/EndingLetterCompoents/LetterStep3Component/LetterStep3Component";
import LetterStep4Component from "../../../components/EndingLetterCompoents/LetterStep4Component/LetterStep4Component";

/* import css */
import "./EndingPage.css";

const EndingPage = () => {
  const params = useParams();
  const [flowerInfoList, setFlowerInfoList] = useState({
    red: {
      color: "red",
      name: "빨간 튤립",
      means: ["사랑의 고백", "열정적인 사랑"],
      img: flowerRed,
    },
    orange: {
      color: "orange",
      name: "주황 튤립",
      means: ["매혹", "온정", "수줍음", "부끄러움"],
      img: flowerOrange,
    },
    yellow: {
      color: "yellow",
      name: "노랑 튤립",
      means: ["헛된 사랑", "이루어질 수 없는"],
      img: flowerYellow,
    },
    purple: {
      color: "purple",
      name: "보라 튤립",
      means: ["영원한 사랑", "영원하지 않은 사랑"],
      img: flowerPurple,
    },
    pink: {
      color: "pink",
      name: "핑크 튤립",
      means: ["사랑의 시작", "애정", "배려"],
      img: flowerPink,
    },
    white: {
      color: "white",
      name: "하얀 튤립",
      means: ["과거의 우정", "실연", "추억", "새로운 시작", "순결"],
      img: flowerWhite,
    },
    mango: {
      color: "mango", // 에셋 없음
      name: "망고 튤립",
      means: ["수줍은 사랑의 표시", "매혹적인 사랑"],
    },
    grapefruit: {
      color: "grapefruit", // 에셋 없음
      name: "자몽 튤립",
      means: ["사랑의 고백"],
    },
    green: {
      color: "green",
      name: "초록 튤립",
      means: ["아름다운 눈"],
      img: flowerGreen,
    },
    blue: {
      color: "blue",
      name: "파란 튤립",
      means: ["사랑합니다 여러분"],
      img: flowerBlue,
    },
  });

  const swiperRef = useRef(1);
  const swiperClass = {
    width: "100%",
    height: "100%",
  };
  const navigate = useNavigate();
  const [endingList, setEndingList] = useState([]);
  const [letterText, setLetterText] = useState("");
  const [flowerObj, setFlowerObj] = useState({});

  useEffect(() => {
    // getFlowerMVPInfo(1).then((res) => {
    //   console.dir(res);
    // });
    // getGardenList().then((res) => {
    //   console.dir(res);
    // });
    getFlowerInfoById(params.id).then((res) => {
      // console.dir(res);
      let obj = flowerInfoList[`${res.flowerColor}`];
      //console.dir(obj);
      setFlowerObj({ ...res });
      let step1Obj = {
        flowerImg: obj.img,
        flowerMeans: res.flowerMeaning.split(","),
        flowerName: obj.name,
      };

      let step2Obj = {
        createdAt: res.createdAt,
        blossomAt: res.blossomAt,
        capacity: res.capacity,
        light: res.light,
        water: res.water,
        name: res.name,
      };

      let step3Obj = {
        name: res.name,
        id: res.id,
        setLetterText,
        letter: res.letter,
      };

      let list = [
        <LetterStep1Component step1Obj={step1Obj} />,
        <LetterStep2Component step2Obj={step2Obj} />,
        <LetterStep3Component step3Obj={step3Obj} />,
        <LetterStep4Component />,
      ];
      setEndingList(list.map((e, i) => <SwiperSlide key={i}>{e}</SwiperSlide>));
    });
  }, []);

  // useEffect(() => {
  //   console.log(letterText);
  //   console.log(flowerObj.id);
  // }, [letterText]);

  return (
    <>
      <HeaderComponent backVisible={true} pageName={"엔딩페이지"}></HeaderComponent>
      <div className="ending-page">
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            if (swiper.realIndex === endingList.length - 1) {
              // console.log("타이머 시작!");
              setTimeout(() => {
                let timerInterval;
                Swal.fire({
                  title: "메인 페이지로 이동합니다.",
                  html: "<b></b> 초 후 창이 닫힙니다.",
                  timer: 2000,
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
                    // console.log(letterText);
                    if (letterText.length > 0) {
                      writeEndLetter(flowerObj.id, letterText).then((res) => {
                        // console.dir(res);
                        navigate("/main", { replace: true });
                      });
                    }
                    if (flowerObj.letter && flowerObj.letter.length) {
                      // console.log("엔딩페이지 다시 보기 종료");
                      navigate("/main", { replace: true });
                    }
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
