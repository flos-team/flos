import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

/* import img */
import userActiveGraph from "../../../../assets/ProfileAsset/user-active-graph.png";
import sunnyImg from "../../../../assets/GlobalAsset/sunny.png";
import cloudyImg from "../../../../assets/GlobalAsset/cloudy.png";
import rainyImg from "../../../../assets/GlobalAsset/rainy.png";

/* module */
import {getMyStatisticData} from "../../../../api/MemberAPI"

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
  
  const [castItemList, setCastItemList ] = useState(castItem.map(({ castId, castImg, className }) => {
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
  }));

  // Will Remove...
  const [plantItem, setPlantItem] = useState([
    { plantId: 1, plantImg: "" },
    { plantId: 2, plantImg: "" },
    { plantId: 3, plantImg: "" },
    { plantId: 4, plantImg: "" },
    { plantId: 5, plantImg: "" },
  ]);

  const plantList = plantItem.map(({ plantId, plantImg }) => {
    let plantItem = (
      <div key={plantId} className="plant-item">
        <img src={plantImg} />
        <p className="plant-name">춘식이</p>
      </div>
    );
    return plantItem;
  });
  
  // 사용자 통계 데이터
  const [userData, setUserData] = useState({
    flowers:[],
    loginInfo: { month: 0, lengthOfMonth: 0, loginCount: 0 },
    postInfo: {postCount: 0, sunny: 0, cloudy: 0, rainy: 0, ratio:{sunny: 0, cloudy: 0, rainy: 0}}
  })

  useEffect(() => {
    /*
flowers (arr)
loginInfo {month: 2, lengthOfMonth: 28, loginCount: 0}
postInfo {postCount: 10, sunny: 3, cloudy: 6, rainy: 1, ratio {sunny: 0.3, cloudy: 0.6, rainy: 0.1}}*/
    
    getMyStatisticData().then((res) => {
      setUserData(res);      
      let idx = 240;
      setCastItemList(
        castItem.map(({ castId, castImg, className }) => {
          let modifiedClassName = `cast-statistics-item-div ${className}`;
          let ratio = 0;
          switch (castId) {
            case 1:
              ratio = res.postInfo.ratio.sunny
              break;
            case 2:
              ratio = res.postInfo.ratio.cloudy
              break;
            case 3:
              ratio = res.postInfo.ratio.rainy
              break;
            default:
              break;
          }

          let itemStyle = {
            width: `${idx*ratio}px`,
          };
          let castItem = (
            <div key={castId} className={modifiedClassName}>
              <div className="img-div">
                <img src={castImg} />
              </div>
              <div className="graph-div">
                <div className="graph-gage" style={itemStyle}></div>
              </div>
            </div>
          );
          return castItem;
        })
      );
    });
  },[])

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
                <p>베이직 화분</p>
              </div>
            </div>
            <div className="user-active-graph">
              <img src={userActiveGraph} />
            </div>
          </div>
          <div className="user-month-div">
            <p>{userData.loginInfo.lengthOfMonth}일 중 {userData.loginInfo.loginCount}일 방문해주셨어요.</p>
          </div>
        </div>
        <div className="user-cast-static-item">
          <div className="cast-title-div">
            <p>제목입니다.</p>
          </div>
          {castItemList}
        </div>
        <div className="plant-static-item">
          <div className="plant-title">
            <p>최근 키운 식물</p>
          </div>
          <div className="plant-container">{plantList}</div>
        </div>
        <div className="user-active-log-item">
          <div className="user-active-title">
            <p>활동 기록</p>
          </div>
          <div className="user-post-count-div">
            <div className="post-count-title">
              <p>작성 횟수</p>
            </div>
            <div className="post-count">
              <p>{userData.postInfo.postCount>999?"999+":userData.postInfo.postCount}</p>
            </div>
          </div>
          <div className="user-heart-share-div">
            <div className="post-count-title">
              <p>마음을 나눈 횟수</p>
            </div>
            <div className="post-count">
              <p>999+</p>
            </div>
          </div>
          <div className="user-heart-get-div">
            <div className="post-count-title">
              <p>마음을 받은 횟수</p>
            </div>
            <div className="post-count">
              <p>999+</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStatisticsPage;
