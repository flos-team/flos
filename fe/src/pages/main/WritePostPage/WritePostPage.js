/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// redux/toolkit
import { useSelector, useDispatch } from "react-redux";
import { setIsToastValue } from "../../../redux/toast";

/* import img */
import pictureIcon from "../../../assets/GlobalAsset/picture-btn.png";

/* import compoents */
import ToggleBtn from "../../../components/ToggleBtn/ToggleBtn";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostResultModal from "../../../components/PostResultModal/PostResultModal";
//dd
/* import module */
import { createPost } from "../../../api/PostAPI";

/* import css */
import "./WritePostPage.css";

const WritePostPage = () => {
  // redux-toolkit
  const toastValue = useSelector((state) => state.toast.value.isToast);
  //
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(toastValue);
    // user();
    // dispatch(setIsToastValue({ isToast: true }));
  }, []);

  // 글작성 모달 on/off 조정하는 함수
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const contentRef = useRef(1);
  const tagRef = useRef(2);
  // 글 내용 입력받는 메서드
  const [content, setContent] = useState("");
  // 감정 결과를 모달에서 보여주기 위해 사용할 화면용 Index
  const [weatherIndex, setWeatherIndex] = useState(1);
  const [weatherText, setWeatherText] = useState("CLOUDY");
  // 감정 결과 분석하여 파싱하는 함수
  const judgeWeatherIdx = (result) => {
    switch (result) {
      case "positive":
        setWeatherIndex(0);
        setWeatherText("SUNNY");
        break;
      case "neutral":
        setWeatherIndex(1);
        setWeatherText("CLOUDY");
        break;
      case "negative":
        setWeatherIndex(2);
        setWeatherText("RAINY");
        break;
      default:
        setWeatherIndex(1);
        setWeatherText("CLOUDY");
        break;
    }
  };
  const [taglist, setTagList] = useState([<></>]);
  const [tagObjList, setTagObjList] = useState([]);
  const handleKeyPress = (e) => {
    let value = tagRef.current.value;
    if (value.includes("#")) {
      let text = value.slice(1, value.length - 1);
      if (e.code === "Space") {
        if (value.length - 3 > 0) {
          const nextList = taglist.concat(<span className="tag-span">{text}</span>);
          setTagList(nextList);
          const nextTag = tagObjList.concat({ tagName: text });
          setTagObjList(nextTag);
        }
        tagRef.current.value = "";
      }
    }
  };
  const checkTagList = () => {
    console.dir(tagObjList);
  };

  return (
    <>
      <HeaderComponent
        backVisible={true}
        pageName={"나의 마음 포스트 작성하기"}
        menuOpt2={"CHECK"}
        menuOpt2Func={async () => {
          //judgeWeatherIdx("negative");
          // let data = getSentimentResult(content);
          // // 빙글거리는 모달을 잠시 보여주고,
          // await data
          //   .then((res) => {
          //     console.dir(res);
          //     let result = res.data.document.sentiment;
          //     judgeWeatherIdx(result); // 결과 세팅해주고
          //     // data.document.sentiment
          //     // "positive"
          //     // "neutral"
          //     // negative
          //   })
          //   .finally(() => {
          //     // 여기서 모달을 닫는다.
          //   });
          setIsVisible(true);
          let data = {
            content: content,
            weather:"CLOUDY"
            
          }
          let data2 = createPost(data.content, data.weather);
          data2.then((e) => {
            console.dir(e);
          })
        }}
      ></HeaderComponent>
      <div className="post-write-container">
        <form className="post-write-form">
          <div className="post-write-input-div">
            <textarea
              className="post-content-input"
              placeholder="내용을 입력하세요"
              ref={contentRef}
              onChange={(e) => {
                setContent(contentRef.current.value);
                console.log(content);
              }}
            />
            <div className="post-tag-input-div">
              {taglist}
              <input
                className="post-tag-input"
                placeholder="#태그를 입력하세요"
                ref={tagRef}
                onKeyUp={handleKeyPress}
              />
            </div>
          </div>
          <div className="post-option-container">
            <label htmlFor="photo-input">
              <div className="photo-add-btn">
                <input type="file" id="photo-input"></input>
                <img src={pictureIcon} />
              </div>
            </label>
            <div className="toggle-btn-container">
              <p className="toggle-text">공개설정</p>
              {/* <div className="toggle-btn"></div> */}
              <div
                onClick={(e) => {
                  checkTagList();
                  //console.dir(locationData);
                }}
              >
                <ToggleBtn></ToggleBtn>
              </div>
            </div>
          </div>
        </form>
        {isVisible ? (
          <PostResultModal
            setVisible={setIsVisible}
            moveMain={() => {
              navigate("/main");
            }}
            weatherIdx={weatherIndex}
            createPost={async () => {
              let data = createPost(content, weatherText);
              await data.then((res) => {
                if (res) {
                  alert("글작성이 완료되었습니다.");
                  dispatch(setIsToastValue({ isToast: true }));
                }
              });
            }}
          ></PostResultModal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default WritePostPage;
