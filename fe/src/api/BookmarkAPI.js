import axios from "axios";
/**
 * @author 1-hee, tykimdream
 *
 * @copyright 2023
 */

// 엑시오스 기본 세팅
axios.defaults.baseURL = "https://i8b210.p.ssafy.io";
axios.defaults.withCredentials = true;

/////////* GET *///////////////////
/**
 */
const setBookMark = async (id) => {
  // console.log(id)
  let url = `/api/book/${id}`;
  let value = false;
  await axios
    .post(url)
    .then((response) => {
      value = true;
      // console.dir(response);
    })
    .catch((error) => {
      console.log("북마크 중 오류 발생");
      console.log(error)
    });
  return value;
};

const deleteBookMark = async (id) => {
  // console.log(id)
  let url = `/api/book/${id}`;
  let value = true;
  await axios
    .delete(url)
    .then((response) => {
      value = false;
      // console.dir(response);
    })
    .catch((error) => {
      console.log("북마크 삭제 중 오류 발생");
    });
  return value;
};

export { setBookMark, deleteBookMark };
