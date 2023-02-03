import React from "react";
import { useState } from "react";
import PostItem from "../../components/PostItem/PostItem";
import styles from "./GlobalPage.module.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import SearchIcon from '../../assets/GlobalAsset/Search.png'
import FilterIcon from '../../assets/GlobalAsset/Filter.png'
import SunnyIcon from '../../assets/GlobalAsset/sunny.png'
import CloudyIcon from '../../assets/GlobalAsset/cloudy.png'
import RainyIcon from '../../assets/GlobalAsset/rainy.png'

function Feed() {
  const [userInfos, setUserInfos] = useState([
    { userInfoId: 1, userInfo: 999 },
    { userInfoId: 2, userInfo: 999 },
    { userInfoId: 3, userInfo: 999 },
    { userInfoId: 4, userInfo: 999 },
    { userInfoId: 5, userInfo: 999 },
  ]);
  const postList = userInfos.map(({ userInfoId, userInfo }) => (
    <PostItem mood={"RAINY"} userName={"wonnny"}></PostItem>
  ));

  const [filtering, setFiltering] = useState(false)
  
  const clickFilterIcon = () => {
    if (filtering===false) {
      setFiltering(true)
    } else {
      setFiltering(false)
    }
  }

  return (
    <div className={styles.feedRoot}>
      <HeaderComponent pageName={"둘러보기"} optType={0}></HeaderComponent>
      <div className={styles.globalroot}>
        <div className={styles.searchdiv}>
          <img src={SearchIcon} className={styles.searchicon} alt=''></img>
          <input className={styles.searchbar} alt=''></input>
          <img src={FilterIcon} className={styles.filtericon} alt='' onClick={clickFilterIcon}></img>
        </div>
        {/* 필터 아이콘 누른 상태 */}
        {filtering ?
        (<div className={styles.filterselectbox}>
          <div className={styles.filtertextdiv}>
            <span className={styles.filtertext}>최신순</span>
            <span className={styles.filtertext}>댓글 많은 순</span>
          </div>
          <div className={styles.filtertextdiv}>
            <img src={SunnyIcon} alt='' className={styles.nonselecticon}></img>
            <img src={CloudyIcon} alt='' className={styles.nonselecticon}></img>
            <img src={RainyIcon} alt='' className={styles.nonselecticon}></img>
          </div>
        </div>) : null}
      </div>
      <div className={styles.main}>
        {/** 친구들의 포스트를 나열한다.  */}
        {postList}
      </div>
    </div>
  );
}

export default Feed;
