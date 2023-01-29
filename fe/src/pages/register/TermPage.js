import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./TermPage.module.css";

function TermPage() {
  const [allCheck, setAllCheck] = useState(false); // 전체 동의
  const [useCheck, setUseCheck] = useState(false); // 이용약관 동의
  const [gpsCheck, setGpsCheck] = useState(false); // 위치사용 동의

  const navigate = useNavigate();

  // 전체동의 버튼
  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true)
      setUseCheck(true)
      setGpsCheck(true)
    } else {
      setAllCheck(false)
      setUseCheck(false)
      setGpsCheck(false)
    }
  };

  // 이용약관 버튼
  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true)
    } else {
      setUseCheck(false)
    }
  };
  
  // 위치 이용 버튼
  const gpsBtnEvent = () => {
    if (gpsCheck === false) {
      setGpsCheck(true)
    } else {
      setGpsCheck(false)
    }
  };

  // 이용 약관 동의했는지 확인
  const checkTerms = () => {
    if (useCheck === false) {
      alert('필수 약관에 동의해주세요')
      // navigate('/register/term')
    } else {
      navigate('/register/fill')
    }
  }

  useEffect(() => {
    if (useCheck === true && gpsCheck === true) {
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }, [useCheck, gpsCheck])

  return (
    <div className={styles.bigframe}>
      <div className={styles.registerorderdiv}>
        <div className={styles.registerorderelement}>
          <div className={styles.blueCircle}>1</div>
          <span>약관동의</span>
        </div>
        <div className={styles.registerorderelement}>
          <div className={styles.whiteCircle}>2</div>
          <span>정보입력</span>
        </div>
        <div className={styles.registerorderelement}>
          <div className={styles.whiteCircle}>3</div>
          <span>가입완료</span>
        </div>
      </div>
      <div className={styles.mainframe}>
        <div>
          <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent}/>
          <label for="all-check">전체동의</label>
        </div>
        <div>
          <input type="checkbox" id="check1" checked={useCheck}  onChange={useBtnEvent}/>
          <label for="check1">개인정보 수집 및 이용 동의 (필수) <span className={styles.textredcolor}>*</span></label>
          <br></br>
          <textarea readOnly className={styles.termTextBox}>이용약관 텍스트</textarea>
        </div>
        <div>
          <input type="checkbox" id="check2" checked={gpsCheck}  onChange={gpsBtnEvent}/>
          <label for="check2">위치기반서비스 이용약관 동의 (선택)</label>
          <br></br>
          <textarea readOnly className={styles.termTextBox}>향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 어쩌구ㅍ향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 향후 제공될 어쩌구향후 제공될 어쩌구향후 제공될 </textarea>
        </div>
        <button type="submit" onClick={checkTerms} className={styles.nextBtn}>다음</button>
      </div>
    </div>
  )
}

export default TermPage