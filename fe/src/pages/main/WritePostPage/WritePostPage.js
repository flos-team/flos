/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// redux/toolkit
// import { useDispatch } from "react-redux";
// import { setIsToastValue, setToastMessage } from "../../../redux/toast";

/* import img */
import pictureIcon from "../../../assets/GlobalAsset/picture-btn.png";
import closeBtn from "../../../assets/GlobalAsset/close-btn.png";

/* import compoents */
// import ToggleBtn from "../../../components/ToggleBtn/ToggleBtn";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import PostResultModal from "../../../components/PostResultModal/PostResultModal";
import Swal from "sweetalert2";

/* import module */
import { createPost } from "../../../api/PostAPI";
import { getSentimentResult } from "../../../api/SentimentAPI";

/* import css */
import "./WritePostPage.css";

const WritePostPage = () => {
  // 글작성 모달 on/off 조정하는 함수
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const contentRef = useRef(1); // 텍스트 입력 폼 ref
  const tagRef = useRef(2); // 태그 입력 폼 ref
  const imgInputRef = useRef(3); // 이미지 인풋 태그 ref
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
  const [tagList, setTagList] = useState([<></>]);
  const [tagTextList, setTagTextList] = useState([]);
  const onChangeWatcher = () => {
    let value = tagRef.current.value;
    //console.log(`value : ${value}`);
    if (value.includes("#") && value.indexOf("#") !== 0) tagRef.current.value = ""; //이상하게 입력받는 경우 예외처리
    if (value.includes("#")) {
      if (value.includes(" ")) {
        let text = value.slice(1, value.length - 1).trim();
        if (text.length > 0) {
          const nextList = tagList.concat(<span className="tag-span">{text}</span>);
          setTagList(nextList);
          const nextTag = tagTextList.concat(text);
          setTagTextList(nextTag);
        }
        tagRef.current.value = "";
      }
    }
  };

  const [imgPreviewList, setImgPreviewList] = useState([<></>]);
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState([]); //파일
  const handleOnChange = (event) => {
    //console.log(event.target.files);
    setImgFile(event.target.files);
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          // console.log(base64);
          if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
            //  console.log(images)
          }
        };
      }
    }
  };
  // redux-toolkit
  // const dispatch = useDispatch();

  const deleteImgPreview = (idx) => {
    //console.log(idx);

    const dataTranster = new DataTransfer();
    let i = 0;
    Array.prototype.forEach.call(imgFile, function (file) {
      if (i !== idx) {
        dataTranster.items.add(file);
      }
      i++;
    });
    setImgFile(dataTranster.files);

    let decImgBase64 = imgBase64.filter((e, i) => i !== idx);
    setImgBase64(decImgBase64);
  };

  useEffect(() => {
    // console.dir(tagTextList);
    setImgPreviewList(
      imgBase64.map((item, i) => (
        <div key={i} className={`img-holder ${i}`}>
          <img className="img-preview" alt="업로드 이미지" src={item} />
          <img
            className="close-btn"
            alt="닫기 버튼"
            src={closeBtn}
            onClick={(e) => {
              deleteImgPreview(i);
            }}
          />
        </div>
      ))
    );
  }, [imgBase64, tagTextList]);

  return (
    <>
      <HeaderComponent
        backVisible={true}
        pageName={"나의 마음 포스트 작성하기"}
        menuOpt2={"CHECK"}
        menuOpt2Func={async () => {
          //judgeWeatherIdx("negative");
          let result = getSentimentResult(content);
          let resultText = "CLOUDY";
          // 빙글거리는 모달을 잠시 보여주고,
          await result
            .then((res) => {
              console.dir(res);
              resultText = res.data.document.sentiment;
              judgeWeatherIdx(resultText); // 결과 세팅해주고
              // data.document.sentiment / "positive", "neutral", "negative"
              setIsVisible(true);
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "오류 발생",
                text: "감정 결과를 불러오던 중 오류가 발생했습니다.",
                footer: "잠시후 다시 시도해 주세요.",
              });
            });
        }}
      ></HeaderComponent>
      <div className="post-write-container">
        <form className="post-write-form">
          <div className="post-write-input-div">
            <textarea
              className="post-content-input"
              Swal
              placeholder="내용을 입력하세요"
              ref={contentRef}
              onChange={(e) => {
                setContent(contentRef.current.value);
                if (contentRef.current.value.length >= 1000) {
                  alert("1000자 이상 입력할 수 없습니다.");
                  contentRef.current.value = contentRef.current.value.slice(0, 1000);
                  setContent(contentRef.current.value);
                }
                //console.log(contentRef.current.value.length);
                // console.log(content);
              }}
            />
            <div className="post-tag-input-div">
              {tagList}
              <input
                className="post-tag-input"
                placeholder="#태그를 입력하세요"
                ref={tagRef}
                onChange={onChangeWatcher}
              />
            </div>
          </div>
          <div className="post-option-container">
            <label htmlFor="photo-input">
              <div className="photo-add-btn">
                <input
                  type="file"
                  id="photo-input"
                  multiple
                  accept="image/jpg, image/jpeg, image/png"
                  ref={imgInputRef}
                  onChange={handleOnChange}
                ></input>
                <img src={pictureIcon} alt="이미지 버튼" />
              </div>
            </label>
            <div className="img-preview-container hide-scroll">{imgPreviewList}</div>
          </div>
        </form>
        {isVisible ? (
          <PostResultModal
            setVisible={setIsVisible}
            moveMain={() => {
              navigate("/main");
            }}
            weatherIdx={weatherIndex}
            judgeWeatherIdx={judgeWeatherIdx}
            createPost={async () => {
              let postObj = {
                content: content,
                tagList: tagTextList,
                weather: weatherText,
                attachFiles: imgFile,
              };
              // console.dir(postObj);
              createPost(postObj.content, postObj.weather, postObj.tagList, postObj.attachFiles)
                .then((res) => {
                  //console.dir(res);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "글 작성이 완료되었습니다",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                })
                .catch((err) => {
                  console.dir(err);
                  Swal.fire("포스트 작성 중 오류 발생");
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
