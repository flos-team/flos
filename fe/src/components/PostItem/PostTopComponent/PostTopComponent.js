import dayjs from "dayjs";
// /* libraray */

/* import react */
import { useState, useEffect, useCallback, useRef } from "react";

/* import img */
import sunnyImg from "../../../assets/GlobalAsset/sunny.png"
import cloudyImg from "../../../assets/GlobalAsset/cloudy.png"
import rainyImg from "../../../assets/GlobalAsset/rainy.png"
import questionMark from "../../../assets/GlobalAsset/question-mark.png"
// import sampleUserImg from "../../../assets/DummyData/writerProfileSample.png"

/* import component */

/* import module */
import COLORS from "../../../styles/colors";
import { getTimeDiffText } from "../../../api/DateModule";

/* import css */
import "./PostTopComponent.css";

/**
 * 
 * @param {string} userImgURL 사용자 이미지 파일 주소
 * @param {string} userNickname 사용자 닉네임
 * @param {Date} date 게시글 작성 일자
 * @param {Enum} weather 날씨 정보
 * @param {Array} tagList 포스트의 태그 리스트
 * @returns 
 */
// userImg, userNickname, timeLog, weather, tagList
const PostTopComponent = ({userImgURL, userNickname, date, weather, tagList}) => {
    let testWeather = "SUNNY"; 
    // RAINY, CLOUDY

    let testTagList = ["기쁨", "슬픔","기쁨", "슬픔","기쁨", "슬픔","기쁨", "슬픔","기쁨", "슬픔","기쁨", "슬픔"];
    const [postTagList, setPostTagList] = useState([]); // 포스트의 태그
    const [postDate, setPostDate] = useState(date); // 포스트의 작성 날짜
    const [postTimeDiffText, setPostTimeDiffText] = useState(""); // 포스트 날짜 차이 텍스트
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
    }

    useEffect(() => {
        // 태그 JSX List 생성
        setPostTagList(tagList !== null ? [] : tagList.map(({ tagName }) => <div className="tag">{tagName}</div>));
        // 날짜 텍스트 생성
        setPostDate(date);
        let text = getTimeDiffText(new dayjs(postDate), new dayjs(new Date()));
        setPostTimeDiffText(text);        
        // 
        setWeatherInfo(weather);
    }, []);

    return (<>
        <div className="post-top-component" style={{background:postColor}}>
            <div className="user-info-div">
                <div className="user-img" style={{backgroundImage:`url(${userImgURL})`}}></div>
                <div className="post-info-div">
                    <p>{userNickname}</p>
                    <p className="time-log">{postTimeDiffText} <img src={postImg} /></p>
                </div>
            </div>
            <div className="tag-container hide-scroll">
                {postTagList}
            </div>
        </div>
    </>)
}

export default PostTopComponent;