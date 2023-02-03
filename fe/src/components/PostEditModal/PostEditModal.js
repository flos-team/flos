import { useState } from "react";

/* img asset */

/* import css */
import "./PostEditModal.css";

const PostEditModal = () => {
  return (
    <>
      <div className="cont">
        <div className="post-edit-modal">
          <div className="post-edit-item">
            <p>수정하기</p>
          </div>
          <div className="post-edit-item">
            <p>삭제하기</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostEditModal;
