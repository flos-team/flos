import { useState } from "react";
import { Link } from "react-router-dom";
/* img src import */
import arrowRight from "../../assets/GlobalAsset/arrow-right.png";
import userSample from "../../assets/DummyData/writerProfileSample.png";

/* color.js */
import { COLORS } from "../../styles/colors";

/* css import */
import "./PostItem.css";

/** */
const PostItem = ({ mood, userName, postId }) => {
  const testURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM_1pnOJt_sEd1qODO-oTkU_DAbzeQirV7GrFZIaD&s";
  return (
    <>
      <div className="post-item">
        <div className="img-container">
          <div className="img-filter">
            <div className="filter">
              <div className="arrow-left" />
            </div>
            <textarea>
              내가 어제 밥을 먹었다. 오늘은 밥을 먹었는데 뭘 먹었냐면 카레 훈제 닭가슴살을 먹었다. 겁나 딱딱했다.
              맛없었다. 후회.. 내가 어제 밥을 먹었다. 오늘은 밥을 먹었는데 뭘 먹었냐면 카레 훈제 닭가슴살을 먹었다. 겁나
            </textarea>
          </div>
          arrow-left
          <img src={testURL} />
        </div>
        <div className="bottom-text-container">
          <div className="user-info-container">
            <div className="user-info-div">
              <img src={userSample}></img>
              <div className="text-div">
                <p className="user-name">Olivia</p>
                <p className="time-log">
                  45분 전<span>☀️</span>
                </p>
              </div>
            </div>
            <div className="more-btn">
              <div className="text-div">
                <p>더보기</p>
              </div>
              <div className="arrow-div">
                <img src={arrowRight} />
              </div>
            </div>
          </div>
          <div className="tag-container">
            {/* 태그가 여러 개일 경우 그에 맞춰 배열 조정 必 */}
            <div className="tag">프록시</div>
            <div className="tag">프록시</div>
            <div className="tag">프록시</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
