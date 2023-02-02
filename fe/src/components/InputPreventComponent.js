import React from 'react'
import styles from './InputPreventComponent.module.css'

function InputPreventComponent() {
  return (
    <>
        <p className={styles.preventlabel}>아래 이미지를 보이는 대로 입력해주세요.</p>
        <div className={styles.preventitem}>
            <div className={styles.textbox}>이미지</div>
            <div className={styles.rightbtnbox}>
                <button className={styles.retrybox}>새로고침</button>
                <button className={styles.voicebox}>음성으로 듣기</button>
            </div>
        </div>
        <input type='text' placeholder='자동입력 방지문자' className={styles.inputprevent}></input>
    </>
  )
}

export default InputPreventComponent