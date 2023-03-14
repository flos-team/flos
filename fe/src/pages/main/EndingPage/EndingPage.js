/* import react */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

/* import lib */
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "@emotion/styled";
import gsap from "gsap";

/* import img */
import flowerRed from "../../../assets/EndingAsset/flower-red.png";
import flowerOrange from "../../../assets/EndingAsset/flower-orange.png";
import flowerYellow from "../../../assets/EndingAsset/flower-yellow.png";
import flowerPurple from "../../../assets/EndingAsset/flower-purple.png";
import flowerPink from "../../../assets/EndingAsset/flower-pink.png";
import flowerWhite from "../../../assets/EndingAsset/flower-white.png";
import flowerMango from "../../../assets/EndingAsset/flower-mango.png";
import flowerGrapefruit from "../../../assets/EndingAsset/flower-grapefruit.png"
import flowerGreen from "../../../assets/EndingAsset/flower-green.png";
import flowerBlue from "../../../assets/EndingAsset/flower-blue.png";
import Swal from "sweetalert2";
// 배경
import background from "../../../assets/EndingAsset/ending-background-img.jpg";

/* import module */
import { getGardenList, getFlowerInfoById, getFlowerMVPInfo, writeEndLetter, getFlowerContributorList } from "../../../api/FlowerAPI";
import { getMemberInfo } from "../../../api/MemberAPI";

/* import component */
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import LetterStep1Component from "../../../components/EndingLetterCompoents/LetterStep1Component/LetterStep1Component";
import LetterStep2Component from "../../../components/EndingLetterCompoents/LetterStep2Component/LetterStep2Component";
import LetterStep3Component from "../../../components/EndingLetterCompoents/LetterStep3Component/LetterStep3Component";
import LetterStep4Component from "../../../components/EndingLetterCompoents/LetterStep4Component/LetterStep4Component";

/* import css */
import "./EndingPage.css";

const SampleCircle = styled.div`
  border-radius: 50%;
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  color: ${(p) => p.color};
  justify-contet: center;
  text-align: center;
  align-items: center;
  font-size: 0.8rem;
`;


const EndingPage = () => {
  const params = useParams();
  const user = useSelector((state) => state.user.userData);

  const [flowerInfoList, setFlowerInfoList] = useState({
    red: {
      color: "red",
      name: "빨간 튤립",
      means: ["사랑의 고백", "열정적인 사랑"],
      img: flowerRed,
      foryou: "열정적인 삶을 살고 있는"
    },
    orange: {
      color: "orange",
      name: "주황 튤립",
      means: ["매혹", "온정", "수줍음", "부끄러움"],
      img: flowerOrange,
      foryou: "매혹적이고 따뜻한"
    },
    yellow: {
      color: "yellow",
      name: "노랑 튤립",
      means: ["헛된 사랑", "이루어질 수 없는"],
      img: flowerYellow,
      foryou: "이루어질 수 없는 많은 행복한 일들을 겪고 있는"
    },
    purple: {
      color: "purple",
      name: "보라 튤립",
      means: ["영원한 사랑", "영원하지 않은 사랑"],
      img: flowerPurple,
      foryou: "영원할 것 같던 순간을 지나 금새 행복해질"
    },
    pink: {
      color: "pink",
      name: "핑크 튤립",
      means: ["사랑의 시작", "애정", "배려"],
      img: flowerPink,
      foryou: "다시 새롭게 즐거운 시작을 할"
    },
    white: {
      color: "white",
      name: "하얀 튤립",
      means: ["과거의 우정", "실연", "추억", "새로운 시작", "순결"],
      img: flowerWhite,
      foryou: "과거를 추억하며 개운하게 새로운 시작을 할"
    },
    mango: {
      color: "mango", // 에셋 없음
      name: "망고 튤립",
      means: ["수줍은 사랑의 표시", "매혹적인 사랑"],
      img: flowerMango,
      foryou: "매일매일이 매력적인"
    },
    grapefruit: {
      color: "grapefruit", // 에셋 없음
      name: "자몽 튤립",
      means: ["사랑의 고백"],
      img: flowerGrapefruit,
      foryou: "즐거운 날들을 즐기며 항상 사랑스러운"
      
    },
    green: {
      color: "green",
      name: "초록 튤립",
      means: ["아름다운 눈"],
      img: flowerGreen,
      foryou: "아름다운 눈으로 미래를 바라보며 내일을 준비하는"
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
  // 다시보기 페이지인지 엔딩 페이지인지 구분하기 위한 불리언 state
  const [isReplay, setIsReplay] = useState(false);
  //
  const [endingList, setEndingList] = useState([]);
  // 편지 쓰는 데 사용하는 state 변수
  const [letterText, setLetterText] = useState("");
  // 꽃 정보를 담아둘 Object
  const [flowerObj, setFlowerObj] = useState({});
  // 마지막 스와이프 뷰에서 메인으로 이동할지 물어보는 문구 여부 관리용 boolean state
  const [isShowEndText, setIsShowEndText] = useState(false);
  const CircleRef1 = useRef();
  const CircleRef2 = useRef();
  const CircleRef3 = useRef();
  const CircleRef4 = useRef();
  const CircleRef5 = useRef();
  const CircleRef6 = useRef();
  const CircleRef7 = useRef();
  const CircleRef8 = useRef();
  const CircleRef9 = useRef();
  const CircleRef10 = useRef();
  const timeline = gsap.timeline({ yoyo: true, repeatDelay: 1 });
  let contributorInterval;
  let contributorList;

  const endingPageInit = async () => {
    let step1Obj = {} // 엔딩페이지 1 컴포넌트 정보 담을 Object
    let step2Obj = {} // 엔딩페이지 2 컴포넌트 정보 담을 Object
    let step3Obj = {} // 엔딩 페이지 3 컴포넌트 정보 담을 Object
    let step4Obj = {} // 엔딩 페이지 4 컴포넌트 정보 담을 Object
    let imgList = [];
    let userInfo = {}

    await getMemberInfo()
      .then((res) => {
      userInfo = {...res}
      })
    

    await getFlowerInfoById(params.id).then((res) => {
      // console.dir(res);
      let obj = flowerInfoList[`${res.flowerColor}`];
      // console.log(userInfo.nickname);
      //console.dir(obj);
      setFlowerObj({ ...res });
      step1Obj = {
        nickname: userInfo.nickname,
        flowerImg: obj.img,
        flowerMeans: res.flowerMeaning.split(","),
        flowerName: obj.name,
        foryou: obj.foryou
      };

      step2Obj = {
        createdAt: res.createdAt,
        blossomAt: res.blossomAt,
        capacity: res.capacity,
        light: res.light,
        water: res.water,
        name: res.name,
      };

      step3Obj = {
        name: res.name,
        id: res.id,
        setLetterText,
        letter: res.letter,
        isDisable: res.lettering,
      };
      setIsReplay(res.lettering);

      step4Obj = {
        name: res.name,
        color: res.flowerColor,
      }
    });

    let url = "https://i8b210.p.ssafy.io/api/";

    await getFlowerContributorList(params.id)
      .then((res) => {
        let list = res.map((e) => `${url}file/${e.profileImage.saveName}`);
        step2Obj['peopleImgURLs'] = list;
        contributorList = res;
      })

    // console.log(res.letter);
    let list = [
      <LetterStep1Component step1Obj={step1Obj} />,
      <LetterStep2Component step2Obj={step2Obj} />,
      <LetterStep3Component step3Obj={step3Obj} />,
      <LetterStep4Component step4Obj={step4Obj} />,
    ];
    setEndingList(list.map((e, i) => <SwiperSlide key={i}>{e}</SwiperSlide>));


  };

  useEffect(() => {
    let contributorIdx = 0;
    let url = "********";
    endingPageInit().then(() => {
      contributorInterval = setInterval(() => {
        if (contributorIdx++ === contributorList.length) {
          contributorIdx = 0;
        }
        // 랜덤으로 x 좌표 위치를 정함
        const xPos1 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos2 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos3 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos4 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos5 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos6 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos7 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos8 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos9 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));
        const xPos10 = Math.random() * 400 * ((-1) * (Math.random() < 0.5));

        // 각 Ref에 이미지 삽입
        CircleRef1.current.style.backgroundImage = `url(${url}file/${contributorList[contributorIdx % contributorList.length].profileImage.saveName})`;
        CircleRef2.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 1) % contributorList.length].profileImage.saveName})`;
        CircleRef3.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 2) % contributorList.length].profileImage.saveName})`;
        CircleRef4.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 3) % contributorList.length].profileImage.saveName})`;
        CircleRef5.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 4) % contributorList.length].profileImage.saveName})`;
        CircleRef6.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 5) % contributorList.length].profileImage.saveName})`;
        CircleRef7.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 6) % contributorList.length].profileImage.saveName})`;
        CircleRef8.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 7) % contributorList.length].profileImage.saveName})`;
        CircleRef9.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 8) % contributorList.length].profileImage.saveName})`;
        CircleRef10.current.style.backgroundImage = `url(${url}file/${contributorList[(contributorIdx + 9) % contributorList.length].profileImage.saveName})`;

        // 각 Ref에 아이디 삽입
        CircleRef1.current.innerText = contributorList[contributorIdx % contributorList.length].nickname;
        CircleRef2.current.innerText = contributorList[(contributorIdx + 1) % contributorList.length].nickname;
        CircleRef3.current.innerText = contributorList[(contributorIdx + 2) % contributorList.length].nickname;
        CircleRef4.current.innerText = contributorList[(contributorIdx + 3) % contributorList.length].nickname;
        CircleRef5.current.innerText = contributorList[(contributorIdx + 4) % contributorList.length].nickname;
        CircleRef6.current.innerText = contributorList[(contributorIdx + 5) % contributorList.length].nickname;
        CircleRef7.current.innerText = contributorList[(contributorIdx + 6) % contributorList.length].nickname;
        CircleRef8.current.innerText = contributorList[(contributorIdx + 7) % contributorList.length].nickname;
        CircleRef9.current.innerText = contributorList[(contributorIdx + 8) % contributorList.length].nickname;
        CircleRef10.current.innerText = contributorList[(contributorIdx + 9) % contributorList.length].nickname;

        // 각 Ref 움직임 지정
        timeline.fromTo(CircleRef1.current, { x: xPos1, y: 1000 }, { x: xPos1, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef2.current, { x: xPos2, y: 1000 }, { x: xPos2, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef3.current, { x: xPos3, y: 1000 }, { x: xPos3, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef4.current, { x: xPos4, y: 1000 }, { x: xPos4, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef5.current, { x: xPos5, y: 1000 }, { x: xPos5, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef6.current, { x: xPos6, y: 1000 }, { x: xPos6, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef7.current, { x: xPos7, y: 1000 }, { x: xPos7, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef8.current, { x: xPos8, y: 1000 }, { x: xPos8, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef9.current, { x: xPos9, y: 1000 }, { x: xPos9, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });
        timeline.fromTo(CircleRef10.current, { x: xPos10, y: 1000 }, { x: xPos10, y: -1000, duration: Math.floor(Math.random() * 8) + 10 });

      }, 2000);
    });

    return () => {
      clearInterval(contributorInterval);
    };

  }, []);
  // 편지 글의 작성유무, 마지막 페이지 여부에 따른 재렌더링용 useEffect
  useEffect(() => {
  }, [letterText, isShowEndText]);


  return (
    <>
      <div className="ending-page" style={{ backgroundImage: `url(${background})` }}>
        <HeaderComponent backVisible={true} isClear={true} pageName={"엔딩페이지"}></HeaderComponent>
        <SampleCircle width={45} height={45} color={"white"} ref={CircleRef1}></SampleCircle>
        <SampleCircle width={75} height={75} color={"white"} ref={CircleRef2}></SampleCircle>
        <SampleCircle width={50} height={50} color={"white"} ref={CircleRef3}></SampleCircle>
        <SampleCircle width={120} height={120} color={"white"} ref={CircleRef4}></SampleCircle>
        <SampleCircle width={70} height={70} color={"white"} ref={CircleRef5}></SampleCircle>
        <SampleCircle width={45} height={45} color={"black"} ref={CircleRef6}></SampleCircle>
        <SampleCircle width={80} height={80} color={"black"} ref={CircleRef7}></SampleCircle>
        <SampleCircle width={65} height={65} color={"black"} ref={CircleRef8}></SampleCircle>
        <SampleCircle width={100} height={100} color={"black"} ref={CircleRef9}></SampleCircle>
        <SampleCircle width={70} height={70} color={"black"} ref={CircleRef10}></SampleCircle>
        <div className="ending-page-root">
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              if (swiper.realIndex == 3) {
                setIsShowEndText(true);
              } else {
                setIsShowEndText(false);
              }
            }}
            style={swiperClass}
            ref={swiperRef}
            direction={"vertical"}
          >
            {endingList}
          </Swiper>
          {isShowEndText ?
            <div className="final-guide-text blinking">
              <p className="clickMeText" onClick={(e) => {
                if (!isReplay) {
                  writeEndLetter(params.id, letterText)
                    .then((res) => {
                      // console.log("글작성 결과 : ", res);
                      Swal.fire(
                        '편지 작성 완료',
                        '메인 페이지로 이동합니다.',
                        'success'
                      )
                      navigate("/main");
                    })
                } else {
                  Swal.fire(
                    '다시 보기 종료',
                    '메인 페이지로 이동합니다.',
                    'success'
                  )
                  navigate("/main");
                }
              }}>클릭하면 메인으로 이동합니다.</p>
            </div>
            : <></>}

        </div>
      </div>
    </>
  );
};

export default EndingPage;
