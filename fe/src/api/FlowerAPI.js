import axios from "axios";
/**
 * @author JUHA
 *
 * @copyright 2023
 */


// 엑시오스 기본 세팅
axios.defaults.baseURL = "https://i8b210.p.ssafy.io";
axios.defaults.withCredentials = true;

/////////* GET *///////////////////
/**
 * getFlowerInfo : 홈페이지의 꽃 정보를 가져옴
 * @returns
 */
const getFlowerInfo = async () => {
  let url = `/api/flower/home`;
  let value = null;
  await axios
    .get(url)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log(err, "꽃 정보 가져오는 중 오류 발생");
    });
  return value;
};

export { getFlowerInfo };
