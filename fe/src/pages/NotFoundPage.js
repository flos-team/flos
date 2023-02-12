import React from 'react'
import groom from '../assets/GoormAsset/goorm-error.png';
import { Link } from "react-router-dom";
import styles from './NotFoundPage.module.css'

function NotFoundPage() {

  return (
    <div className={styles.container}>
      <img src={groom} alt='' className={styles.groomimg}></img>
      <div className={styles.margin}>
        <div className={styles.header}>해당 페이지를 찾을 수 없습니다.</div>
        <div className={styles.header}>(404 Not Found)</div>
      </div>
      <div clasName={styles.margin}>
        <div className={styles.body}>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</div>
        <div className={styles.body}>입력하신 주소가 정확한지 확인해 주시기 바랍니다.</div>
      </div>
      <div>
      
      <Link to="/main">
        <div className={styles.gohome}>홈으로 돌아가기 →</div>
      </Link>

      </div>
    </div>
  )
}

export default NotFoundPage