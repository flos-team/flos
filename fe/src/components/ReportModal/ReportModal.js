import { useState } from "react";

import "./ReportModal.css";

const ReportModal = () => {
    
    return (<>
        <div className="report-item">
            <div className="report-header">
                <div className="report-header-div">
                    <p>해당 사용자를 신고하시겠습니까?</p>
                </div>
                <input className="report-input"></input>
                <div className="close-btn"></div>
            </div>
            <div className="report-btn">
                <p>제출하기</p>
            </div>
        </div>
        
    </>)
}

export default ReportModal;