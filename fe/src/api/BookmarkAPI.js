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
 */
const sendBookmarkRequest = async () => {
  let url = `/api/post/{id}/bookmark`;
  let value = null;
  await axios
    .get(url)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("북마크 중 오류 발생");
    });
  return value;
};

export { sendBookmarkRequest };
