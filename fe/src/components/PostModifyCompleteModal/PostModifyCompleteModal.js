import { useState } from "react";

/* img asset */
import checkSymbol from "../assets/GlobalAsset/check-symbol.png";

/* css import */
import "./PostModifyCompleteModal.css";

const PostModifyCompleteModal = () => {
  return (
    <>
      <div className="modified-alert-modal">
        <div className="m-a-header">
          <p>글 수정이 완료되었습니다.</p>
        </div>
        <div className="m-a-main">
          <img src={checkSymbol} />
        </div>
      </div>
    </>
  );
};

export default PostModifyCompleteModal;
