import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { reportUser } from "../../api/ReportAPI";

import "./ReportModal.css";
import closeBtn from "../../assets/GlobalAsset/close-btn.png";

const ReportModal = ({ setClose }) => {
  const param = useParams();
  console.log(param.id);

  const [content, setContent] = useState();

  const submitReport = () => {
    reportUser(param.id, content).then((response) => {
      console.log(response);
    });
  };

  const handleInput = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div
        className="background"
        onClick={(e) => {
          setClose(false);
        }}
      ></div>
      <div className="report-item">
        <div className="report-header">
          <div className="report-header-div">
            <p>해당 사용자를 신고하시겠습니까?</p>
          </div>

          <textarea
            className="report-textarea"
            onChange={handleInput}
            value={content}
          >
            {" "}
          </textarea>
          <div
            className="close-btn"
            style={{ backgroundImage: `url(${closeBtn})` }}
            onClick={(e) => {
              setClose(false);
            }}
          ></div>
        </div>
        <div
          className="report-btn"
          onClick={() => {
            submitReport();
          }}
        >
          <p>신고하기</p>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
