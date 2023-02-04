import axios from "axios";
/**
 * @author 1-hee
 *
 * @copyright 2023
 */
// 엑시오스 기본 세팅
axios.defaults.baseURL = "http://i8b210.p.ssafy.io:8080";

/////////* GET *///////////////////
/**
 * getPost : 특정 게시글 정보
 * @param {number} postId
 * @returns {Promise} A Promise object containing a PostObject
 */
const getPost = async (postId) => {
  let url = `/post/${postId}`;
  let post = null;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        // console.dir(response.data);
        post = response.data;
      }
    })
    .catch((error) => {
      console.log("해당 게시글이 존재하지 않습니다.");
    });

  return post;
};

/**
 * getPostList : 게시글 리스트
 * @param {number} page 페이지번호 (1 ~ N)
 * @returns {Object} 포스트 리스트 정보를 갖는 자바스크립트 객체
 */
const getPostList = async (page = 1) => {
  let url = `/post/list?page=${page}`;
  let postListObject = {};
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        let data = response.data;
        postListObject = {
          postList: [...data.content],
          hasContent: data.hasContent,
          isFirst: data.isFirst,
          isLast: data.isLast,
          nextPage: data.nextPage,
          nextSize: data.nextSize,
        };
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return postListObject;
};

/**
 * getBookMarkList : 로그인된 회원별 북마크한 게시글 리스트
 * @param {number} page 페이지번호 (1 ~ N)
 * @returns
 */
// TODO
const getBookMarkList = async (page = 1) => {
  let url = `/post/list/bookmark?page=${page}`;
  let bookmarkList = [];
  await axios
    .get(url)
    .then((response) => {
      console.dir(response);
      if (response.status === 200) {
        // bookmarkList = [...response.data.content];
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return bookmarkList;
};

/**
 * getPostListByUserId : 작성자별 게시글 리스트
 * @param {number} page 페이지번호 (1 ~ N)
 * @param {string} memberId 사용자 Id
 * @returns
 */
// 작성자별 게시글 리스트
// TODO...
const getPostListByUserId = async (page, memberId) => {
  let url = `/post/list/member?page=${page}&page=${memberId}`;
  let userPostList = [];
  await axios
    .get(url)
    .then((response) => {
      console.dir(response);
      if (response.status === 200) {
        // userPostList= [...response.data.content];
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return userPostList;
};

/**
 * getPostListByWeather : 날씨별 게시글 리스트
 * @param {number} page 페이지번호 (1 ~ N)
 * @param {string} weather 날씨(무드)
 * @returns
 */
const getPostListByWeather = async (page, weather) => {
  let url = `/post/list/weather?page=${page}&weather=${weather}`;
  let weatherPostList = [];
  await axios
    .get(url)
    .then((response) => {
      console.dir(response);
      if (response.status === 200) {
        // weatherPostList = [...response.data.content];
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return weatherPostList;
};

/////////* POST *///////////////////
/**
 * createPost : 게시글 생성
 * @param {string} content 게시글 본문
 * @param {Enum} weather 날씨에 대한 Enum값 [ SUNNY | CLOUDY | RAINY ]
 * @param {Array:Object} tagList 게시글 태그 리스트, 자바스크립트 객체 배열 [{tagName:value}...]
 * @param {Array:ImageBitmap} attachFiles 게시글에 첨부한 비트맵 리소스 배열
 * @returns {Promise} A Promise object containing Boolean
 */
// TODO...
const createPost = async (content, weather, tagList, attachFiles) => {
  let url = `/post/create`;
  // weather 감정 string 아마 enum?
  let newPost = {
    attachFiles,
    content,
    tagList,
    weather,
  };
  let isCreated = false;
  await axios
    .post(url, newPost)
    .then((response) => response)
    .then((result) => {
      console.dir(result);
      isCreated = false;
    });
  return isCreated;
};

// 향후 메서드 변경(POST -> PUT)되면 바뀔 예정
/**
 * modifyPost : 게시글 수정
 * @param {number} postId 게시글 id
 * @param {string} content 게시글 본문
 * @param {*} writerId 작성자 ID
 * @param {Array:Object} tagList 게시글 태그 리스트, 자바스크립트 객체 배열 [{tagName:value}...]
 * @param {Array:ImageBitmap} attachFiles 게시글에 첨부한 비트맵 리소스 배열
 * @param {Date} modifiedAt 글을 수정한 시간 (자바스크립트 Date 객체)
 * @returns {Promise} A Promise object containing Boolean
 */
// TODO...
const modifyPost = async (postId, content, writerId, tagList, attachFiles, modifiedAt) => {
  let url = "/post/modify";
  let modfiedPost = {
    attachFiles,
    content,
    id: postId,
    modifiedAt,
    tagList,
    writerId,
  };
  let isModified = false;
  await axios
    .post(url, modfiedPost)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("오류발생~~!!");
    });
  return isModified;
};

/////////* PUT *///////////////////

/////////* DELETE *///////////////////
/**
 * deletePost : 게시글 삭제
 * @param {*} postId 게시글 번호(아이디)
 * @returns {Promise} A Promise object containing Boolean
 */
const deletePost = async (postId) => {
  let url = `/post/${postId}/delete`;
  let isDeleted = false;
  await axios
    .delete(url)
    .then((response) => {
      console.dir(response);
      if (response.status === 200) {
        console.log("글 삭제 완료");
        alert("글이 삭제되었습니다");
        isDeleted = true;
      } else if (response.status === 204) {
        // console.log("해당 글이 존재하지 않습니다");
        // isDeleted = false;
        console.log("글 삭제 완료");
        alert("글이 삭제되었습니다");
        isDeleted = true;
      }
    })
    .catch((err) => {
      console.log("해당 글이 존재하지 않습니다");
    });
  return isDeleted;
};

export { getPost, getPostList, getBookMarkList, getPostListByUserId, createPost, modifyPost, deletePost };
