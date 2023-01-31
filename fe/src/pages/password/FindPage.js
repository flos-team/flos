import React, { useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent'
import TextLogoComponent from "../../components/TextLogoComponent";
import styles from './FindPage.module.css'


function FindPage() {

    const [isJoinedEmail, setIsJoinedEmail] = useState(false)

    const sendEmail = () => {
        if (!isJoinedEmail) {
            // 가입되지 않은 아이디입니다
            // 임시로 확인없이 true로 변경함
            setIsJoinedEmail(true)
        } else {
            // 메일 전송
            // useState(인증번호 입력 폼 출력)
        }
    }

    return (
        <>
            <HeaderComponent backVisible={1} pageName={'비밀번호 찾기'}></HeaderComponent>
            <TextLogoComponent></TextLogoComponent>
            <div className={styles.mainframe}>
                <span>이메일 인증을 통한 비밀번호 찾기(재설정)</span>
                <div className={styles.findbox}>
                    <span className={styles.boxtext1}>※ flos 서비스에 회원가입시 등록된 아이디를 입력합니다.</span>
                    <span className={styles.boxtext2}>귀하의 계정과 연결된 이메일 주소로 비밀번호 재설정 방법에 관한 안내문을 전송해 드립니다.</span>

                    <div className={styles.inputbox}>
                        <span className={styles.boxtext3}>비밀번호를 찾으려는 아이디</span>
                        <div className={styles.inputbtnbox}>
                            <input type="text" className={styles.mailnuminput}></input>
                            <button onClick={sendEmail} className={styles.mailsendbtn}>메일 전송</button>
                        </div>
                        {isJoinedEmail ? (
                            <div className={styles.mailsend}>
                                <input type="number" className={styles.mailnuminput}></input>
                                <button className={styles.mailsenddoublebtn}>인증</button>
                                <button className={styles.mailsenddoublebtn}>재전송</button>
                                <span className={styles.mailsendtext}>해당 이메일로 인증 메일을 보냈습니다.</span>
                            </div>
                            ) : null}
                    </div>
                </div>
            </div>
        </>
  )
}

export default FindPage