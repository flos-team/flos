import React from 'react'
import HeaderComponent from '../../components/HeaderComponent';
import TextLogoComponent from "../../components/TextLogoComponent";
import styles from './ResultPage.module.css'


function ResultPage() {
  return (
    <>      
      <HeaderComponent backVisible={true} pageName={"회원가입"} optType={''}></HeaderComponent>
      <TextLogoComponent></TextLogoComponent>

      <p>회원가입 완료</p>
      <video className={styles.videodiv}
            
            style={{
                maxWidth: '500px',
                maxHeight: '700px',
                display: 'block',
                }}
                
             muted
             autoPlay
             loop
              >
            <source src="/night.mp4" type="video/mp4" />
            <strong>Your browser does not support the video tag.</strong>
              </video>
      {/* <div class={styles.videodiv}>
        <video className={styles.test} muted autoPlay loop src="/vibe.mp4" />
      </div> */}
    </>

  )
}

export default ResultPage