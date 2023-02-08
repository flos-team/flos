/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

/* import img */

/* import compoents */


/* import module */

/* import css */
import "./LetterStep2Component.css";

const LetterStep2Component = () => {

    return (<>
        <div className="letter-step2-component">
            <div className="letter-user-nickname-div">
                <p>TO. [닉네임]</p>
            </div>
            <div className="lettter-content-div">
                <textarea>
                안녕! [닉네임]!
그동안 내 성장을 지켜봐주고 많은 도움을 줘서 고마웠어!
나는 [시작일]일 부터 자라기 시작해서 [종료일]일에 다 자랐어!
너는 나를 키우는 동안 많은 사람들과 [총 소통 횟수]번 소통을 해서 나를 키워줬구나!
그 중에서 너는 [제일 많이 소통한 사람]와 제일 많은 [소통횟수] 회의 소통을 했구나!
나는 햇빛은 총 [햇빛] 번, 빗물은 총 [빗물]번 받았어!
나는 지난 시간동안 너와 함께 지내면서 정말 행복했어.
너도 나와 같은 마음이었으면 좋겠다.
가끔 [가든 이름]로 놀러와서 나를 추억해줘! 정말 고마워!
                </textarea>
            </div>
            <div className="letter-flower-name-div">
                <p>FROM. [꽃이름]</p>
            </div>

        </div>
    </>)
}

export default LetterStep2Component;