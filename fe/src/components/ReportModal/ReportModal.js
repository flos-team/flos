import { useState } from "react";

import "./ReportModal.css";
import closeBtn from "../../assets/GlobalAsset/close-btn.png";

const ReportModal = ({setClose}) => {
    
    return (<>
        <div className="background" onClick={(e)=>{setClose(false)}}></div>
        <div className="report-item">
            <div className="report-header">
                <div className="report-header-div">
                    <p>해당 사용자를 신고하시겠습니까?</p>
                </div>
                <textarea className="report-textarea"></textarea>
                <div className="close-btn" style={{backgroundImage:`url(${closeBtn})`}} onClick={(e)=>{setClose(false)}}></div>
            </div>
            <div className="report-btn">
                <p>신고하기</p>
            </div>
        </div>
        
    </>)
}

export default ReportModal;