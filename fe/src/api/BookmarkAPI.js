import axios from "axios";
/**
 * @author 1-hee, tykimdream
 *
 * @copyright 2023
 */

// 엑시오스 기본 세팅
axios.defaults.baseURL = "********";
axios.defaults.withCredentials = true;

/////////* GET *///////////////////
/**
 */
const setBookMark = async (id) => {
  let url = `/api/book/${id}`;
  let value = false;
  await axios
    .post(url)
    .then((response) => {
      value = true;
    })
    .catch((error) => {
      console.log("북마크 중 오류 발생");
      console.log(error)
    });
  return value;
};

const deleteBookMark = async (id) => {
  let url = `/api/book/${id}`;
  let value = true;
  await axios
    .delete(url)
    .then((response) => {
      value = false;
    })
    .catch((error) => {
      console.log("북마크 삭제 중 오류 발생");
    });
  return value;
};

export { setBookMark, deleteBookMark };
