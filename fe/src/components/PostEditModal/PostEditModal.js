import { useState } from "react";

/* img asset */

/* import css */
// import "./PostEditModal.css";

import styles from './PostEditModal.module.css'

const PostEditModal = () => {
  // const delete = () => {
  // }
  return (
    <div className={styles.modalcontainer}>
      <div className={styles.modalitem}>삭제하기</div>
      {/* 원희님이 만들어놓은 코드 */}
      {/* <div className="cont">
        <div className="post-edit-modal">
          <div className="post-edit-item">
            <p>수정하기</p>
          </div>
          <div className="post-edit-item">
            <p>삭제하기</p>
          </div>
        </div>
      </div> */}
    </div>
    
  );
};

export default PostEditModal;
