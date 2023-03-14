import axios from "axios";
/**
 * @author JUHA
 *
 * @copyright 2023
 */

// 엑시오스 기본 세팅
axios.defaults.baseURL = "********";
axios.defaults.withCredentials = true;

/////////* GET *///////////////////
/**
 * getFlowerInfo : 홈페이지의 꽃 정보를 가져옴
 * @returns
 */
const getFlowerInfo = async () => {
  let url = `/api/flower/home`;
  let value = null;
  await axios
    .get(url)
    .then(({ data }) => {
      value = {
        id: data.id,
        name: data.name,
        isFullGrown: data.isFullGrown,
        flowerType: data.flowerType,
        currentGrowthValue: data.currentGrowValue,
        maxGrowthValue: data.capacity,
        color: data.flowerColor,
      };
    })
    .catch(({ response }) => {
      if (response.data.errorCode === "NO_FLOWER_EXISTS") {
        value = "NO_FLOWER_EXISTS";
      }
      console.log(response.status, "꽃 정보 가져오는 중 오류 발생");
    });
  return value;
};

/**
 * getGardenList : 홈페이지의 꽃 정보를 가져옴
 * @returns
 */
const getGardenList = async (page = 0) => {
  let url = `/api/flower/garden?page=${page}`;
  let value = null;
  await axios
    .get(url)
    .then(({ data }) => {
      value = data;
    })
    .catch((err) => {
      console.log(err, "꽃 정보 가져오는 중 오류 발생");
    });
  return value;
};


/**
 * getFlowerContributorList : 꽃의 성장에 기여한 회원 리스트를 반환함
 * @returns
 */
const getFlowerContributorList = async (flowerId) => {
  let url = `/api/flower/${flowerId}`;
  let value = null;
  await axios
    .get(url)
    .then(({ data }) => {
      //console.log(data);
      value = data;
    })
    .catch((err) => {
      console.log(err, "꽃 기여자 리스트 가져오는 중 오류 발생");
    });
  return value;
};


// 꽃 가져오는 메서드 정보
/**
 * @param {number} id 불러올 꽃의 id 정보
 * @return 꽃의 정보를 담은 Promise Object 리턴
 */
const getFlowerInfoById = async (id) => {
  let url = `/api/flower/info`;
  let data = {
    id,
  };
  let flowerInfoObject = {};
  await axios
    .post(url, data)
    .then((response) => {
      flowerInfoObject = { ...response.data };
    })
    .catch((err) => {
      console.log("꽃 정보를 가져오던 중 오류가 발생했습니다.");
      return err;
    });
  return flowerInfoObject;
};

// 최고 기여자
/**
 *
 * @param {number} flowerId 꽃 ID
 */
const getFlowerMVPInfo = async (flowerId) => {
  let url = `/api/flower/best/${flowerId}`;
  let flowerMVPInfoObj = {};
  await axios
    .get(url)
    .then((response) => {
      console.dir(response);
      flowerMVPInfoObj = { ...response.data };
    })
    .catch((err) => {
      console.log("꽃 최고 기여자를 불러오던 도중 오류 발생");
      return err;
    });
  return flowerMVPInfoObj;
};


/////////* POST *///////////////////
/**
 * createFlower : 꽃 정보를 줌
 * @param {string} flowerType
 * @param {string} name
 */
const createFlower = async (flowerType, name) => {
  let url = `/api/flower`;
  let value = null;
  console.log(name);
  await axios
    .post(url, { flowerType, name })
    .then(({ data }) => {
      console.log("꽃 생성함!!");
      console.log(data);
    })
    .catch((err) => {
      console.log(err, "꽃 생성하는 중 오류 발생");
    });
  return value;
};

/**
 * giveSun : sun을 하나 줌
 */

const giveSun = async () => {
  let url = `/api/flower/give-light`;
  let value = null;
  await axios
    .post(url, {})
    .then(({ data }) => {
      console.log("햇빛 줌!!");
      console.log(data);
      value = data;
    })
    .catch((err) => {
      console.log(err, "꽃 생성하는 중 오류 발생");
    });
  return value;
};

/**
 * giveRain : rain을 하나 줌
 */

const giveRain = async () => {
  let url = `/api/flower/give-water`;
  let value = null;
  await axios
    .post(url, {})
    .then(({ data }) => {
      console.log("비 줌!!");
      console.log(data);
      value = data;
    })
    .catch((err) => {
      console.log(err, "꽃 생성하는 중 오류 발생");
    });
  return value;
};

/**
 * flowering : 개화 진행
 */

const flowering = async (id) => {
  let url = `/api/flower/gardening`;
  let value = null;
  console.log(id);
  await axios
    .post(url, { id })
    .then(({ data }) => {
      console.log("개화 함!!");
      console.log(data);
      value = data;
    })
    .catch((err) => {
      console.log(err, "개화 중 오류 발생");
    });
  return value;
};

const writeEndLetter = async (id, letter = "") => {
  let url = "/api/flower/letter";
  let data = {
    id,
    letter,
  };
  let isLettered = false;
  await axios
    .post(url, data)
    .then((res) => {
      console.dir(res);
      isLettered = true;
    })
    .catch((err) => {
      console.log("꽃에게 편지를 쓰는 도중 오류가 발생했습니다.");
      return err;
    });
  return isLettered;
};

/////////* PUT *///////////////////
/**
 * modifyFlower : 꽃 이름 변경 줌
 * @param {long} id
 * @param {string} name
 */
const modifyFlower = async (id, name) => {
  let url = `/api/flower`;
  let value = null;
  await axios
    .put(url, { id, name })
    .then(({ data }) => {
      console.log("꽃 이름 변경함!!");
      console.log(data);
    })
    .catch((err) => {
      console.log(err, "꽃 이름 변경하는 중 오류 발생");
    });
  return value;
};

export {
  getFlowerInfo,
  getGardenList,
  getFlowerContributorList,
  getFlowerInfoById,
  getFlowerMVPInfo,
  createFlower,
  giveSun,
  giveRain,
  flowering,
  writeEndLetter,
  modifyFlower,
};