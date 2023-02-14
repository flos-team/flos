import React, {useEffect} from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import TextLogoComponent from "../../components/TextLogoComponent";
import InputPreventComponent from '../../components/InputPreventComponent'
import styles from './ChangePage.module.css'
import {getMemberInfo} from '../../api/MemberAPI'


function ChangePage() {

  useEffect(() => {
    getMemberInfo().then((res) => {
      // console.log(res)
      // console.log('hi')
    })
  }, [])

  return (
    <>
        <HeaderComponent backVisible={1} pageName={'비밀번호 변경'}></HeaderComponent>

        <div className={styles.bigframe}>
            <TextLogoComponent></TextLogoComponent>
            <p className={styles.fontsize16}>비밀번호 변경</p>
            <p className={styles.fontsize14}><span className={styles.fontblue}>안전한 비밀번호로 내 정보를 보호</span>하세요</p>
            <br></br>
            <div className={styles.fontsize12}>
                <p className={styles.fontyellow}>·다른 아이디/사이트에서 사용한 적 없는 비밀번호</p>
                <p><span className={styles.fontyellow}>·이전에 사용한 적 없는 비밀번호</span>가 안전합니다.</p>
            </div>
            <div>
                <input type="password" placeholder="현재 비밀번호" className={styles.inputnowpw}></input>
                <input type="password" placeholder="새 비밀번호" className={styles.inputbox}></input>
                <input type="password" placeholder="새 비밀번호 확인" className={styles.inputbox}></input>
            </div>
            <br></br>
            <InputPreventComponent></InputPreventComponent>
        </div>
    </>
  )
}

export default ChangePage