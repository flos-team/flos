import { useState } from "react";
import { useParams } from "react-router-dom"

/* img asset */

/* import css */
// import "./PostEditModal.css";

import styles from './PostEditModal.module.css'
import { deletePost } from '../../api/PostAPI'
import Swal from "sweetalert2";

const PostEditModal = () => {
  const params = useParams();

  const [clickDotImg, setClickDotImg] = useState(false);

  const isClickDotImg = () => {
    setClickDotImg(true)
  }

  const result = () => {
    Swal.fire({
      title: '해당 게시물을 <br> 삭제하시겠습니까?',
      text: '삭제된 게시물은 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(params.id)
        .then((res) => {
          // console.log(res)
          setClickDotImg(false)
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        console.log('삭제 안 함')
        setClickDotImg(false)
      }
    })
  }

  return (
    <div className={styles.modalcontainer}>
      <div className={styles.modalitem} onClick={isClickDotImg}>삭제하기</div>
      {clickDotImg ? result() : null}
    </div>
    
  );
};

export default PostEditModal;
