import axios from "axios";
/**
 * @author 1-hee
 *
 * @copyright 2023
 */
// 엑시오스 기본 세팅
axios.defaults.baseURL = "********";
axios.defaults.withCredentials = true;

/**
 *
 * @param {string} content 본문 내용
 * @returns {Promise} A PromiseObject contains SentimentResultObject;
 */
const getSentimentResult = async (content) => {
  let url = `/api/sentiment`;
  let data = {
    content,
  };
  console.dir(content);
  console.dir(data);
  let SentimentResultObject = {};
  await axios
    .post(url, data)
    .then((response) => {
      SentimentResultObject = response;
      console.dir(response);
    })
    .catch((err) => {
      console.log("감정 분석 결과를 가져오던 도중 오류가 발생했습니다.");
    });
  return SentimentResultObject;
};

export { getSentimentResult };
