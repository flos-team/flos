import axios from "axios";
/**
 * @author 1-hee
 *
 * @copyright 2023
 */

// 엑시오스 기본 세팅
axios.defaults.baseURL = "********";
axios.defaults.withCredentials = true;

/////////* GET *///////////////////
/**
 */
const getNotification = async () => {
  let url = `/api/notification`;
  let value = [];
  await axios
    .get(url)
    .then((response) => {
      value = response.data
    })
    .catch((err) => {
      console.log("알림 가져오는 중 오류 발생");
    });
  return value;
};

export { getNotification };



/////////* DELETE *///////////////////
const deleteNotification = async (id) => {
  let url = `/api/notification/${id}`;
  let isDeleted = false;
  await axios
    .delete(url)
    .then((response) => {
      // console.log(url)
      // console.dir(response);
      if (response.status === 200) {
        // console.log("알림 삭제 완료");
        isDeleted = true;
      }
    })
    .catch((err) => {
      console.log("해당 알림이 존재하지 않습니다");
    });
  return isDeleted;
};

export { deleteNotification };