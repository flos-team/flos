import axios from "axios";
/**
 * @author 1-hee, tykimdream
 *
 * @copyright 2023
 */
// 엑시오스 기본 세팅
axios.defaults.baseURL = "********";
axios.defaults.withCredentials = true;

//// * GET * /////////////////////////
// 나의 팔로워/팔로잉 리스트 확인하는 메서드
/**
 * getFollowerList : 팔로워 리스트
 * @param
 * @returns {Promise} A Promise object containing a FollowerObject
 */
const getFollowerList = async (orderByName) => {
  let url = `api/follow/follower`;
  let followList = null;
  await axios
    .get(url, { params: { orderByName: orderByName } })
    .then((response) => {
      followList = response.data;
    })
    .catch((error) => {
    });
  return followList;
};

/**
 * getFollowingList : 팔로잉 리스트
 * @param
 * @returns {Promise} A Promise object containing a FollowerObject
 */
const getFollowingList = async (orderByName) => {
  let url = `/api/follow/following`;
  let followList = [];
  await axios
    .get(url, { params: { orderByName: orderByName } })
    .then((response) => {
      followList = response.data;
    })
    .catch((error) => {
      console.log("나의 팔로잉 리스트를 불러오던 도중 오류가 발생하였습니다.");
    });
  return followList;
};

// 다른 사람의 팔로워/팔로잉 리스트 확인하는 메서드
/**
 * getOtherFollowerList : 다른 사람 팔로워 리스트
 * @param {number} id 팔로워 조회를 하고싶은 사람의 id
 * @returns {Promise} A Promise object containing a FollowerObject
 */
const getOtherFollowerList = async (id) => {
  let url = `/api/follow/follower/${id}`;
  let followList = null;
  await axios
    .get(url)
    .then((response) => {
      followList = response.data;
    })
    .catch((error) => {
      console.log("다른사람의 팔로워 리스트를 불러오던 중 오류가 발생했습니다.");
    });
  return followList;
};

/**
 * getOtherFollowingList : 다른 사람 팔로잉 리스트
 * @param {number} id 팔로워 조회를 하고싶은 사람의 id
 * @returns {Promise} A Promise object containing a FollowerObject
 */
const getOtherFollowingList = async (id) => {
  let url = `/api/follow/following/${id}`;
  let followList = null;
  await axios
    .get(url)
    .then((response) => {
      followList = response.data;
    })
    .catch((error) => {
      console.log("다른사람의 팔로워 리스트를 불러오던 중 오류가 발생했습니다.");
    });
  return followList;
};

////* POST */////////////////////
const doFollowing = async (id, orderByName = false) => {
  let url = `/api/follow`;
  let isFollow = false;
  let data = { id, orderByName };
  await axios
    .post(url, data)
    .then((response) => {
      isFollow = true;
    })
    .catch((err) => {
      console.log("팔로잉을 하는 도중 오류가 발생하였습니다.");
    });
  return isFollow;
};

////* DELETE *//////////////////
const cancelFollowing = async (id) => {
  let url = `/api/follow/${id}`;
  let isFollow = false;
  await axios
    .delete(url)
    .then((response) => {
      isFollow = true;
    })
    .catch((err) => {
      console.log("팔로우를 취소 하는 도중 오류가 발생하였습니다.");
    });
  return isFollow;
};

export { getFollowerList, getFollowingList, getOtherFollowerList, getOtherFollowingList, doFollowing, cancelFollowing };
