/* import react */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
// 망고 TODO...
// 자몽 TODO...
import flowerGreen from "../../../assets/EndingAsset/flower-green.png";
import flowerBlue from "../../../assets/EndingAsset/flower-blue.png";
import Swal from "sweetalert2";
// 배경
import background from "../../../assets/GardenAsset/garden-background-img.jpg";

/* import module */
import { getGardenList, getFlowerInfoById, getFlowerMVPInfo, writeEndLetter, getFlowerContributorList } from "../../../api/FlowerAPI";

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
  color: white;
  justify-contet: center;
  align-items: center;
`;


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
  const [contributorList, setContributorList] = useState([]);
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
  const timeline = gsap.timeline({ yoyo: true, repeatDelay: 1});

  const endingPageInit = async () => {
    let step1Obj = {} // 엔딩페이지 1 컴포넌트 정보 담을 Object
    let step2Obj = {} // 엔딩페이지 2 컴포넌트 정보 담을 Object
    let step3Obj = {} // 엔딩 페이지 3 컴포넌트 정보 담을 Object
    let step4Obj = {} // 엔딩 페이지 4 컴포넌트 정보 담을 Object
    let imgList = [];

    await getFlowerInfoById(params.id).then((res) => {
      // console.dir(res);
      let obj = flowerInfoList[`${res.flowerColor}`];
      //console.dir(obj);
      setFlowerObj({ ...res });
      step1Obj = {
        flowerImg: obj.img,
        flowerMeans: res.flowerMeaning.split(","),
        flowerName: obj.name,
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
      };

      step4Obj = {
        name: res.name,
        color: res.flowerColor,
      }
    });

    let url = "https://i8b210.p.ssafy.io/api/";    
    
    await getFlowerContributorList(params.id)
    .then((res) => {
      // console.dir(res);
      let list = res.map((e) => `${url}file/${e.profileImage.saveName}`);
      console.dir(list);
      step2Obj['peopleImgURLs'] = list;
      setContributorList(list);
    })

    // console.log(res.letter);
    let list = [
      <LetterStep1Component step1Obj={step1Obj} />,
      <LetterStep2Component step2Obj={step2Obj} />,
      <LetterStep3Component step3Obj={step3Obj} isDisable={false} />,
      <LetterStep4Component step4Obj={step4Obj} />,
    ];
    setEndingList(list.map((e, i) => <SwiperSlide key={i}>{e}</SwiperSlide>));


  };
  

  useEffect(() => {
    endingPageInit();
    console.log("contributorList");
    console.log(contributorList);

    let contributorIdx = 0;

    const contributorInterval = setInterval(() => {
      // 2초마다 하나씩 만들어서 위로 띄운다.
      if(contributorIdx++ == contributorList.length){
        contributorIdx = 0;
      }
      const xPos1 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos2 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos3 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos4 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos5 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos6 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos7 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos8 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos9 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));
      const xPos10 = Math.random() * 400 * ( (-1) * (Math.random() < 0.5));

      CircleRef1.current.style.backgroundImage = `url(${contributorList[contributorIdx%10]})`;
      CircleRef2.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 1]})`;
      CircleRef3.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 2]})`;
      CircleRef4.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 3]})`;
      CircleRef5.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 4]})`;
      CircleRef6.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 5]})`;
      CircleRef7.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 6]})`;
      CircleRef8.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 7]})`;
      CircleRef9.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 8]})`;
      CircleRef10.current.style.backgroundImage = `url(${contributorList[contributorIdx%10 + 9]})`;

      timeline.fromTo(CircleRef1.current, {x: xPos1, y: 500 }, {x: xPos1, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef2.current, {x: xPos2, y: 500 }, {x: xPos2, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef3.current, {x: xPos3, y: 500 }, {x: xPos3, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef4.current, {x: xPos4, y: 500 }, {x: xPos4, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef5.current, {x: xPos5, y: 500 }, {x: xPos5, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef6.current, {x: xPos6, y: 500 }, {x: xPos6, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef7.current, {x: xPos7, y: 500 }, {x: xPos7, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef8.current, {x: xPos8, y: 500 }, {x: xPos8, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef9.current, {x: xPos9, y: 500 }, {x: xPos9, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      timeline.fromTo(CircleRef10.current, {x: xPos10, y: 500 }, {x: xPos10, y: -500, duration:  Math.floor(Math.random() * 8) + 6});
      

    }, 2000);

    return () => {
      clearInterval(contributorInterval);
    };
   
  }, []);

  useEffect(() => {
    console.log(letterText);
    console.log(flowerObj.id);
    console.log(params.id);
    // getFlowerContributorList(params.id)
    //   .then((res) => {
    //     console.dir(res);
    //   })
    // profileImage.saveName

    
  }, [letterText]);

  return (
    <>
      <div className="ending-page" style={{ backgroundImage: `url(${background})` }}>
        <HeaderComponent backVisible={true} isClear={true} pageName={"엔딩페이지"}></HeaderComponent>
        <SampleCircle width={45} height={45} ref={CircleRef1}></SampleCircle>
        <SampleCircle width={40} height={40} ref={CircleRef2}></SampleCircle>
        <SampleCircle width={50} height={50} ref={CircleRef3}></SampleCircle>
        <SampleCircle width={100} height={100} ref={CircleRef4}></SampleCircle>
        <SampleCircle width={70} height={70} ref={CircleRef5}></SampleCircle>
        <SampleCircle width={45} height={45} ref={CircleRef6}></SampleCircle>
        <SampleCircle width={40} height={40} ref={CircleRef7}></SampleCircle>
        <SampleCircle width={50} height={50} ref={CircleRef8}></SampleCircle>
        <SampleCircle width={100} height={100} ref={CircleRef9}></SampleCircle>
        <SampleCircle width={70} height={70} ref={CircleRef10}></SampleCircle>
        <div className="ending-page-root">
          <Swiper
            spaceBetween={1}
            slidesPerView={1}
            onSlideChange={(swiper) => {
             
            }}
            style={swiperClass}
            ref={swiperRef}
            direction={"vertical"}
          >
            {endingList}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default EndingPage;
