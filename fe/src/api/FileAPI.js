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
 * getFile : 서버로부터 이미지 또는 파일을 요청
 * @param {string} saveName profileImage.saveName
 * @returns
 */
const getFile = async (savedName)=> {
    let url = `/api/file/${savedName}`;
    await axios
        .get(url)
        .then((response) => response)
        .catch((err) => {
            console.log("이미지");
        });
};


export {getFile}