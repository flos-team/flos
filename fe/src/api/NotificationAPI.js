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
const getNotification = () => {
  let url = `/api/notification`;
  let value = {};
  axios
    .get(url)
    .then((response) => {
      value = response
    })
    .catch((err) => {
      console.log("알림 가져오는 중 오류 발생");
    });
  return value;
};

export { getNotification };



/////////* POST *///////////////////
// 맹신 ㄴㄴ made by 범규입니다
const checkNotification = async (id) => {
  let url = `/api/notification`;
  let axiosInfo = {
    'id': id,
  }
  await axios
    .post(url, axiosInfo)
    .then(() => {
      // console.dir(response);
    })
    .catch((err) => {
      console.log("알림 POST 오류 발생");
    });
};

export { checkNotification };