import axios from "axios";
/**
 * @author 1-hee
 *
 * @copyright 2023
 */
// 엑시오스 기본 세팅
axios.defaults.baseURL = "http://i8b210.p.ssafy.io:8080";

/**
 * getCommentList : 게시글의 댓글 리스트
 * @param {id} page 게시물 아이디
 * @returns
 */
const getCommentList = async (id) => {
  // let url = `/post/list?page=${page}`;
  let url = `/post/${id}/comment/list`;
  let commentList = [];
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        commentList = [...response.data.content];
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return commentList;
};

export { getCommentList };
