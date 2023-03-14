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
 * getPost : 특정 게시글 정보
 * @param {number} postId
 * @returns {Promise} A Promise object containing a PostObject
 */
const getPost = async (postId) => {
  let url = `/api/post/${postId}`;
  let post = null;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        post = response.data;
      }
    })
    .catch((error) => {
      console.log("해당 게시글이 존재하지 않습니다.");
    });
  return post;
};

/**
 * getBookMarkList : 로그인된 회원별 북마크한 게시글 리스트
 * @param {number} page 페이지번호 (1 ~ N)
 * @returns {Promise} A Promise Object contains BookmarkListObject
 */
const getBookMarkList = async (page = 0) => {
  let url = `/api/post/list/bookmark?page=${page}`;
  let bookmarkListObject = {};
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        bookmarkListObject = { ...response.data };
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return bookmarkListObject;
};

const getFollowerPostList = async (page = 0) => {
  const url = `/api/post/list/follow?page=${page}`;
  let userPostListObject = {};
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        userPostListObject = response.data;
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return userPostListObject;
};

/**
 * getPostListByUserId : 작성자별 게시글 리스트
 * @param {string} nickName 사용자 닉네임
 * @param {number} page 페이지번호 (0 ~ N)
 * @returns {Promise} A Promise Object contains UserPostListObject
 */
const getPostListByNickname = async (nickName, page = 0) => {
  let url = `/api/post/list/member/${nickName}?page=${page}`;
  let userPostListObject = {};
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        userPostListObject = response.data;
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return userPostListObject;
};

// 닉네임 검색
const getSearchNickname = async (nickName) => {
  let url = `/api/member/search?nickname=${nickName}`;
  let searchNicknamePostListObject = {};
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        searchNicknamePostListObject = response.data;
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(url);
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return searchNicknamePostListObject;
};

/**
 * getPostList : 게시글 리스트
 * @param {number} page 페이지번호 (1 ~ N)
 * @returns {Promise} A Promise Object contains PostListObject
 */
const getPostList = async (page = 0) => {
  let url = `/api/post/list?page=${page}`;
  let postListObject = {};
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        let data = response.data;
        postListObject = {
          postList: [...data.content],
          hasContent: data.hasContent,
          hasNext: data.hasNext,
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
 * getPostListByWeather : 날씨별 게시글 리스트
 * @param {string} weather 날씨(무드)
 * @param {number} page 페이지번호 (1 ~ N)
 * @returns  A Promise Object contains WeatherPostListObject
 */
const getPostListByWeather = async (weather, page = 0) => {
  let url = `/api/post/list/weather?page=${page}&weather=${weather}`;
  let weatherPostListObject = {};
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        weatherPostListObject = response.data;
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return weatherPostListObject;
};

/**
 * getPostListByComment : 댓글 많은 순서대로 게시글 가져오기
 * @param {number} page 페이지번호 (0 ~ N)
 * @returns  A Promise Object contains commentPostListObject
 */
const getPostListByComment = async (page = 0) => {
  let commentPostListObject = {};
  let url = `/api/post/list/descnt?page=${page}`;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        commentPostListObject = response.data;
      }
    })
    .catch((error) => {
      console.log("게시글 리스트가 존재하지 않습니다.");
    });
  return commentPostListObject;
};

/**
 * getPostListByTagName : 태그 내용으로 게시글 검색하기
 * @param {string} tagName 태그명
 * @param {number} page 페이지번호 (0 ~ N)
 * @returns  A Promise Object contains commentPostListObject
 */
const getPostListByTagName = async (tagName) => {
  let tagNamePostListObject = {};
  let url = `/api/post/list/tag/${tagName}`;
  await axios
    .get(url)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        tagNamePostListObject = response.data;
      }
    })
    .catch((err) => {
      console.log("태그로 게시글을 검색할 수 없습니다.");
    });
  return tagNamePostListObject;
};

/////////* POST *///////////////////
/**
 * createPost : 게시글 생성
 * @param {string} content 게시글 본문
 * @param {Enum} weather 날씨에 대한 Enum값 [ SUNNY | CLOUDY | RAINY ]
 * @param {Array:string} tagList 게시글 태그 리스트, 자바스크립트 객체 배열 [{tagName:value}...]
 * @param {Array:ImageBitmap} attachFiles 게시글에 첨부한 비트맵 리소스 배열
 * @returns {Promise} A Promise object containing Boolean
 */
const createPost = async (content, weather, tagList, attachFiles = []) => {
  let url = "/api/post";
  const formData = new FormData();
  // console.dir(formData);
  formData.append("content", content);
  formData.append("weather", weather);
  formData.append("tagList", tagList);
  Object.values(attachFiles).forEach((file) =>
    formData.append("attachFiles", file)
  );
  /*
attachFiles array[string]
content string (query)	
tagList array[string]
weather  
  */

  let isCreated = false;
  await axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      isCreated = true;
    })
    .catch((err) => {
      console.dir(err);
      console.log("글 작성 중 오류 발생");
    });
  return isCreated;
};

/////////* PUT *///////////////////
// 향후 메서드 변경(POST -> PUT)되면 바뀔 예정
/**
 * modifyPost : 게시글 수정
 * @param {number} postId 게시글 id
 * @param {string} content 게시글 본문
 * @param {number} writerId 작성자 ID
 * @param {Array:Object} tagList 게시글 태그 리스트, 자바스크립트 객체 배열 [{tagName:value}...]
 * @param {Array:ImageBitmap} attachFiles 게시글에 첨부한 비트맵 리소스 배열
 * @param {Date} modifiedAt 글을 수정한 시간 (자바스크립트 Date 객체)
 * @returns {Promise} A Promise object containing Boolean
 */
const modifyPost = async (
  postId,
  content,
  writerId,
  tagList,
  attachFiles,
  modifiedAt = new Date()
) => {
  let url = "/api/post/modify";
  let modifiedPost = {
    attachFiles,
    content,
    id: postId,
    modifiedAt,
    tagList,
    writerId,
  };
  let isModified = false;
  await axios
    .put(url, modifiedPost)
    .then((response) => {
      console.dir(response);
    })
    .catch((err) => {
      console.log("오류발생~~!!");
    });
  return isModified;
};

/////////* DELETE *///////////////////
/**
 * deletePost : 게시글 삭제
 * @param {*} postId 게시글 번호(아이디)
 * @returns {Promise} A Promise object containing Boolean
 */
const deletePost = async (postId) => {
  let url = `/api/post/${postId}`;
  let isDeleted = false;
  await axios
    .delete(url)
    .then((response) => {
      console.dir(response);
      if (response.status === 200) {
        console.log("글 삭제 완료");
        isDeleted = true;
      } else if (response.status === 204) {
        // console.log("해당 글이 존재하지 않습니다");
        // isDeleted = false;
        // console.log("글 삭제 완료");
        // isDeleted = true;
      }
    })
    .catch((err) => {
      console.log("해당 글이 존재하지 않습니다");
    });
  return isDeleted;
};

export {
  getPost,
  getPostList,
  getBookMarkList,
  getSearchNickname,
  getPostListByNickname,
  getPostListByWeather,
  getPostListByComment,
  getPostListByTagName,
  createPost,
  modifyPost,
  deletePost,
  getFollowerPostList,
};
