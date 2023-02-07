import axios from "axios";
/**
 * @author 1-hee
 *
 * @copyright 2023
 */
// 엑시오스 기본 세팅
axios.defaults.baseURL = "https://i8b210.p.ssafy.io";
axios.defaults.withCredentials = true;

/////////* GET *///////////////////
/**
 * getPost : 특정 게시글 정보
 * @param {string} content 입력한 글
 * @returns {Promise} A Promise object containing a SentimentResultObject
 */
const getSentimentResult = async (content) => { 
    let url = "/api/sentiment";
    let data = {
        content,
    }
    await axios
        .post(url, data)
        .then((res) => {
            console.dir(res);
        })
        .catch((err) => {
            console.log("감정분석 중 오류가 발생했습니다")
        });
}

export {getSentimentResult}