import axios from "axios";
/**
 * @author tykimdream
 *
 * @copyright 2023
 */

// 엑시오스 기본 세팅
axios.defaults.baseURL = "********";
axios.defaults.withCredentials = true;

/**
 * getMaliciousList : 신고 내역 전체 조회
 * 필요한 param 없음
 * @returns
 */
const getMaliciousList = async () => {
  let url = `/api/member/member-report`;
  let value = "";
  await axios
    .get(url)
    .then((response) => {
      value = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
    return value
};

/**
 * getMaliciousListByReporterID : 신고한 사람 이름으로 신고조회
 * 필요한 param 신고한사람 pk
 * @returns
 */
const getMaliciousListByReporterID = async (reporterId) => {
  let url = `/api/member/member-report?reporterId=${reporterId}`;

  await axios
    .post(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * getMaliciousListByMaliciousUserID : 신고당한 사람 이름으로 신고조회
 * 필요한 param 신고당한사람 pk
 * @returns
 */
const getMaliciousListByMaliciousUserID = async (targetId) => {
  let url = `/api/member/member-report?targetId=${targetId}`;

  await axios
    .post(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * getUnhandledReportList : 미처리 신고만 모아보기
 * 
 * 필요한 param isConclusion=true
 * @returns
 */
const getUnhandledReportList = async () => {
  let url = `/api/member/member-report?isConclusion=false`;

  await axios
    .post(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * getHandledReportList : 처리 신고만 모아보기
 * 필요한 param isConclusion=false
 * @returns
 */
const getHandledReportList = async () => {
  let url = `/api/member/member-report?isConclusion=true`;
  await axios
    .post(url)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST

/**
 * postHandleReport  : 관리자가 신고를 처리
 * 필요한 body : id, conclusion(형량)
 * @returns
 */
const postHandleReport = async (conclusion, userId) => {
  const data = {
    conclusion : conclusion,
    id : userId,
  };
  let url = `api/member/member-report`;
  await axios
    .post(url, data)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * reportUser : 유저 ID와 신고 내용을 전달하여 신고 접수
 * Post방식으로 신고할사람의 pk, 신고내용(description)
 * @param {string} content 신고 내용
 * @returns
 */
const reportUser = async (userId, description) => {
  const data = {
    id : userId,
    description : description,
  };
  let url = `/api/member/sue/`;
  await axios
    .post(url, data)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};


const getMemberList = async() =>{
  let url = `/api/member/all-member`;
  let result = [];
  await axios.get(url).then(response => {
    result = [...response.data];
    console.log(result)
  }).catch(err => {
    console.log(err);
  })
  return result
}

export {
  getMaliciousList,
  getMaliciousListByReporterID,
  getMaliciousListByMaliciousUserID,
  getUnhandledReportList,
  getHandledReportList,
  postHandleReport,
  reportUser,
  getMemberList
};
