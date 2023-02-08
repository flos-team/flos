import axios from "axios";
/**
 * @author tykimdream
 *
 * @copyright 2023
 */
// 엑시오스 기본 세팅
axios.defaults.baseURL = "https://i8b210.p.ssafy.io";
axios.defaults.withCredentials = true;

/**
 * getFollowerList : 팔로워 리스트
 * @param
 * @returns {Promise} A Promise object containing a FollowerObject
 */
const getFollowerList = async () => {
  let url = `api/follow/follower`;
  let followList = null;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        // console.dir(response.data);
        followList = response.data;
        // console.log(post)
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(post);
  return followList;
};

export {getFollowerList}