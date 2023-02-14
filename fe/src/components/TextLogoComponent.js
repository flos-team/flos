import React from 'react'
import styles from './TextLogoComponent.module.css'

function TextLogoComponent() {
  return (
    <div className={styles.headertextframe}>
        <h3 className={styles.headertext}>당신이 마음이 꽃피는 곳</h3>
        <h3 className={styles.subText}>Flos</h3>
        <br></br>
    </div>
  )
}

export default TextLogoComponent