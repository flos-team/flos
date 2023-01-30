import React from 'react'
import HeaderComponent from '../../components/HeaderComponent'
import styles from './ResultPage.module.css'


function ResultPage() {
  return (
    <>      
      <HeaderComponent backVisible={true} pageName={"회원가입"} optType={''}></HeaderComponent>
      <div className={styles.headertextframe}>
        <h3 className={styles.headertext}>편안한 감정공유 공간</h3>
        <h3 className={styles.headertext}>Flos</h3>
        <br></br>
      </div>

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