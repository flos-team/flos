import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGardenList } from "../../../../api/FlowerAPI";
import dayjs from "dayjs";

/* import img */
import userActiveGraph from "../../../../assets/ProfileAsset/user-active-graph.png";
import sunnyImg from "../../../../assets/GlobalAsset/sunny.png";
import cloudyImg from "../../../../assets/GlobalAsset/cloudy.png";
import rainyImg from "../../../../assets/GlobalAsset/rainy.png";
import step1Img from "../../../../assets/StatisticsAsset/statistics_step1.png";
import step2Img from "../../../../assets/StatisticsAsset/statistics_step2.png";
import step3Img from "../../../../assets/StatisticsAsset/statistics_step3.png";
import step4Img from "../../../../assets/StatisticsAsset/statistics_step4.png";
import step5Img from "../../../../assets/StatisticsAsset/statistics_step5.png";
import step6Img from "../../../../assets/StatisticsAsset/statistics_step6.png";
/* import img */
import flowerRed from "../../../../assets/EndingAsset/flower-red.png";
import flowerOrange from "../../../../assets/EndingAsset/flower-orange.png";
import flowerYellow from "../../../../assets/EndingAsset/flower-yellow.png";
import flowerPurple from "../../../../assets/EndingAsset/flower-purple.png";
import flowerMango from "../../../../assets/EndingAsset/flower-mango.png";
import flowerGrapefruit from "../../../../assets/EndingAsset/flower-grapefruit.png"
import flowerPink from "../../../../assets/EndingAsset/flower-pink.png";
import flowerWhite from "../../../../assets/EndingAsset/flower-white.png";
import flowerGreen from "../../../../assets/EndingAsset/flower-green.png";
import flowerBlue from "../../../../assets/EndingAsset/flower-blue.png";

/* module */
import { getMyStatisticData } from "../../../../api/MemberAPI";

/* component */
import HeaderComponent from "../../../../components/HeaderComponent/HeaderComponent";

/* import CSS */
import "./UserStatisticsPage.css";
import { useEffect } from "react";

const UserStatisticsPage = () => {
  const [castItem, setCastItem] = useState([
    { castId: 1, castImg: sunnyImg, className: "sunny-item-static-div" },
    { castId: 2, castImg: cloudyImg, className: "cloudy-item-static-div" },
    { castId: 3, castImg: rainyImg, className: "rainy-item-static-div" },
  ]);

  const user = useSelector((state) => state.user.userData);

  const [castItemList, setCastItemList] = useState(
    castItem.map(({ castId, castImg, className }) => {
      let modifiedClassName = `cast-statistics-item-div ${className}`;
      let castItem = (
        <div key={castId} className={modifiedClassName}>
          <div className="img-div">
            <img src={castImg} />
          </div>
          <div className="graph-div">
            <div className="graph-gage"></div>
          </div>
        </div>
      );
      return castItem;
    })
  );

  // Will Remove...
  const [plantItem, setPlantItem] = useState([
    { plantId: 1, plantImg: "" },
    { plantId: 2, plantImg: "" },
    { plantId: 3, plantImg: "" },
    { plantId: 4, plantImg: "" },
    { plantId: 5, plantImg: "" },
  ]);

  const tempItem = plantItem.map(({ plantId, plantImg }) => {
    let plantItem = (
      <div key={plantId} className="plant-item">
        <img src={plantImg} />
        <p className="plant-name">춘식이</p>
      </div>
    );
    return plantItem;
  });

  const [plantList, setPlantList] = useState([<div>불러올 식물 데이터가 없습니다.</div>]);

  // 사용자 통계 데이터
  const [userData, setUserData] = useState({
    flowers: [],
    loginInfo: { month: 0, lengthOfMonth: 0, loginCount: 0 },
    postInfo: { postCount: 0, sunny: 0, cloudy: 0, rainy: 0, ratio: { sunny: 0, cloudy: 0, rainy: 0 } },
  });

  /*
<15% - step1
<30% - step2
<45% - step3
<60% - step4
<75% - step5
<100% - step6
*/
  const [gradeImg, setGradeImg] = useState(step1Img);
  const [gradeText, setGradeText] = useState("베이직 화분");

  const judgeGrade = (ratio) => {
    if (ratio < 20) {
      setGradeImg(step1Img);
      setGradeText("반가운 분");
    } else if (ratio < 40) {
      setGradeImg(step2Img);
      setGradeText("소중한 분");
    } else if (ratio < 60) {
      setGradeImg(step3Img);
      setGradeText("친근한 분");
    } else if (ratio < 80) {
      setGradeImg(step4Img);
      setGradeText("엄청난 분");
    } else if (ratio < 90) {
      setGradeImg(step5Img);
      setGradeText("흘륭한 분");
    } else {
      // < 100
      setGradeImg(step6Img);
      setGradeText("완벽한 분");
    }
  };

  // 꽃 렌더링을 위한 정보 init
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
      img: flowerMango,
    },
    grapefruit: {
      color: "grapefruit", // 에셋 없음
      name: "자몽 튤립",
      means: ["사랑의 고백"],
      img: flowerGrapefruit,
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

  //

  useEffect(() => {
    getGardenList().then((res) => {
      //console.dir(res);
      if (res && res.content && res.content.length) {
        let flowerListJSX = res.content.map((e, i) => {
          let flowerRenderObj = flowerInfoList[e.flowerColor];
          let dateString = dayjs(e.blossomAt, "YYYY-MM-DD HH:mm:ss").format("YYYY년 MM월 DD일");
          let item = (
            <div key={i} className="plant-item">
              <img src={flowerRenderObj.img} />
              <p className="flowering-date ">{dateString}</p>
              <p className="plant-name">
                {e.flowerState} {e.flowerType} {e.name}
              </p>
            </div>
          );
          return item;
        });
        setPlantList(flowerListJSX);
      } else {
        setPlantList(<div>불러올 식물 데이터가 없습니다.</div>);
      }
    });

    getMyStatisticData().then((res) => {
      setUserData(res);
      // console.dir(res);
      let loginRatio = (res.loginInfo.loginCount / res.loginInfo.lengthOfMonth) * 100;
      //let loginRatio = (28 / 28) * 100;
      judgeGrade(loginRatio);
      setCastItemList(
        castItem.map(({ castId, castImg, className }) => {
          let modifiedClassName = `cast-statistics-item-div ${className}`;
          let ratio = 0;
          let postNumber = 0;
          switch (castId) {
            case 1:
              ratio = res.postInfo.ratio.sunny;
              postNumber = res.postInfo.sunny;
              break;
            case 2:
              ratio = res.postInfo.ratio.cloudy;
              postNumber = res.postInfo.cloudy;

              break;
            case 3:
              ratio = res.postInfo.ratio.rainy;
              postNumber = res.postInfo.rainy;
              break;
            default:
              break;
          }

          let itemStyle = {
            width: `${ratio * 100}%`,
          };
          let castItem = (
            <div key={castId} className={modifiedClassName}>
              <div className="img-div">
                <img src={castImg} />
              </div>
              <div className="graph-div">
                <div className="graph-gage" style={itemStyle}></div>
                <span className="graph-number">{postNumber}</span>
              </div>
            </div>
          );
          return castItem;
        })
      );
    });
  }, []);

  return (
    <>
      <div className="user-static-page">
        <HeaderComponent backVisible={true} pageName={`${user.nickname} 님의 활동 기록`}></HeaderComponent>
        <div className="user-active-static-item">
          <div className="user-active-div">
            <div className="user-info-div">
              <div className="user-name-div">
                <p>{user.nickname}</p>
              </div>
              <div className="user-grade-div">
                <p>
                  <b>{gradeText}</b>
                </p>
              </div>
            </div>
            <div className="user-active-graph">
              <img src={gradeImg} />
            </div>
          </div>
          <div className="user-month-div">
            <p>
              {userData.loginInfo.lengthOfMonth}일 중 {userData.loginInfo.loginCount}일 방문해주셨어요.
            </p>
          </div>
        </div>
        <div className="user-cast-static-item">
          <div className="cast-title-div">
            <p>주간 포스트 날씨 비율</p>
          </div>
          {castItemList}
        </div>
        <div className="plant-static-item">
          <div className="plant-title">
            <p>최근 키운 식물</p>
          </div>
          <div className="plant-container hide-scroll">{plantList}</div>
        </div>
        <div className="user-active-log-item">
          <div className="user-active-title">
            <p>포스트</p>
          </div>
          <div className="user-post-count-div">
            <div className="post-count-title">
              <p>작성 횟수</p>
            </div>
            <div className="post-count">
              <p>{userData.postInfo.postCount > 999 ? "999+" : userData.postInfo.postCount}</p>
            </div>
          </div>          
        </div>
      </div>
    </>
  );
};

export default UserStatisticsPage;
