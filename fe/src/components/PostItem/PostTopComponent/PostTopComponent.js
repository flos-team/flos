// /* libraray */

/* import react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* import img */
import sunnyImg from "../../../assets/GlobalAsset/sunny.png";
import cloudyImg from "../../../assets/GlobalAsset/cloudy.png";
import rainyImg from "../../../assets/GlobalAsset/rainy.png";
import questionMark from "../../../assets/GlobalAsset/question-mark.png";
// import sampleUserImg from "../../../assets/DummyData/writerProfileSample.png"

/* import component */

/* import module */
import COLORS from "../../../styles/colors";

/* import css */
import "./PostTopComponent.css";

/**
 *
 * @param {string} userImgURL 사용자 이미지 파일 주소
 * @param {string} userNickname 사용자 닉네임
 * @param {Date} date 게시글 작성 일자
 * @param {Enum} weather 날씨 정보
 * @param {Array} tagList 포스트의 태그 리스트
 * @param {function} moveProfile 다른사람 프로필로 이동하는 함수
 * @returns
 */
// userImg, userNickname, timeLog, weather, tagList
const PostTopComponent = ({
  userImgURL,
  userNickname,
  date,
  flag,
  weather,
  tagList,
  moveProfile,
}) => {
  // console.log(date);
  let testWeather = "SUNNY";
  const navigate = useNavigate();
  // RAINY, CLOUDY
  let testTagList = [
    "기쁨",
    "슬픔",
    "기쁨",
    "슬픔",
    "기쁨",
    "슬픔",
    "기쁨",
    "슬픔",
    "기쁨",
    "슬픔",
    "기쁨",
    "슬픔",
  ];
  const [postTagList, setPostTagList] = useState([]); // 포스트의 태그
  // const [postDate, setPostDate] = useState(); // 포스트의 작성 날짜
  // const [postTimeDiffText, setPostTimeDiffText] = useState(""); // 포스트 날짜 차이 텍스트
  const [postColor, setPostColor] = useState("#000");
  const [postImg, setPostImg] = useState(questionMark);

  const setWeatherInfo = (weather) => {
    switch (weather) {
      case "SUNNY":
        setPostColor(COLORS.yellow100);
        setPostImg(sunnyImg);
        break;
      case "CLOUDY":
        setPostColor(COLORS.mono100);
        setPostImg(cloudyImg);
        break;
      case "RAINY":
        setPostColor(COLORS.skyBlue100);
        setPostImg(rainyImg);
        break;
      default:
        setPostColor(COLORS.white);
        setPostImg(questionMark);
        break;
    }
  };

  useEffect(() => {
    // 태그 JSX List 생성
    setPostTagList(
      tagList !== null
        ? []
        : tagList.map(({ tagName }) => <div className="tag">{tagName}</div>)
    );
    setWeatherInfo(weather);
  }, [flag]);

  return (
    <>
      <div className="post-top-component" style={{ background: postColor }}>
        <div className="user-info-div">
          <div
            className="user-img"
            style={{ backgroundImage: `url(${userImgURL})` }}
            onClick={(e) => {
              moveProfile();
            }}
          ></div>
          <div className="post-info-div">
            <p>{userNickname}</p>
            <p className="time-log">
              {date}
              <img src={postImg} />
            </p>
          </div>
        </div>
        <div className="tag-container hide-scroll">{postTagList}</div>
      </div>
    </>
  );
};

export default PostTopComponent;
