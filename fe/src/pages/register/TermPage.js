import React, { useEffect, useState } from 'react'

function TermPage() {
  const [allCheck, setAllCheck] = useState(false); // 전체 동의
  const [useCheck, setUseCheck] = useState(false); // 이용약관 동의
  const [gpsCheck, setGpsCheck] = useState(false); // 위치사용 동의

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

  useEffect(() => {
    if (useCheck === true && gpsCheck === true) {
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }, [useCheck, gpsCheck])

  return (
    <form method="post" action="">
      <div>
        <label>
        	약관동의
        </label>
        <div>
        	<div>
        		<input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent}/>
        		<label for="all-check">전체동의</label>
        	</div>
        	<div>
        		<input type="checkbox" id="check2" checked={useCheck}  onChange={useBtnEvent}/>
        		<label for="check2">이용약관 <span>(필수)</span></label>
        	</div>
        	<div>
        		<input type="checkbox" id="check3" checked={gpsCheck}  onChange={gpsBtnEvent}/>
        		<label for="check3">위치 ㅇㅇ <span>(선택)</span></label>
        	</div>
        </div>
      </div>
      <button type="submit">
      	회원가입하기
      </button>
    </form>
  )
}

export default TermPage