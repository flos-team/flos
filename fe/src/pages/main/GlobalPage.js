import React, { useState } from "react";
import PostItem from "../../components/PostItem/PostItem";
import styles from "./GlobalPage.module.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import SearchIcon from '../../assets/GlobalAsset/Search.png'
import FilterIcon from '../../assets/GlobalAsset/Filter.png'
import SunnyIcon from '../../assets/GlobalAsset/sunny.png'
import CloudyIcon from '../../assets/GlobalAsset/cloudy.png'
import RainyIcon from '../../assets/GlobalAsset/rainy.png'
import MoveToTopToggle from '../../components/MoveToTop/MoveToTopToggle.js'

function Feed() {
  const [userInfos, setUserInfos] = useState([
    { userInfoId: 1, userInfo: 999 },
    { userInfoId: 2, userInfo: 999 },
    { userInfoId: 3, userInfo: 999 },
    { userInfoId: 4, userInfo: 999 },
    { userInfoId: 5, userInfo: 999 },
  ]);
  
  const postItems = userInfos.map(({ userInfoId, userInfo }) => (
    <PostItem mood={"RAINY"} userName={"wonnny"}></PostItem>
  ));
  

  const [filtering, setFiltering] = useState(false) // 필터링 아이콘 누른 상태 확인
  const [filterStandard, setFilterStandard] = useState(1) // 정렬 기준 (1: 최신순 2: 댓글 많은 순 3: 맑음 4: 흐림 5: 비)
  
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
            <span className={filterStandard === 1 ? styles.filtertextstandard : styles.filtertext} onClick={() => setFilterStandard(1)}>최신순</span>
            <span className={filterStandard === 2 ? styles.filtertextstandard : styles.filtertext} onClick={() => setFilterStandard(2)}>댓글 많은 순</span>
          </div>
          <div className={styles.filtertextdiv}>
            <img src={SunnyIcon} alt='' className={filterStandard === 3 ? styles.filterweatherstandard : styles.filterweathericon} onClick={() => setFilterStandard(3)}></img>
            <img src={CloudyIcon} alt='' className={filterStandard === 4 ? styles.filterweatherstandard : styles.filterweathericon} onClick={() => setFilterStandard(4)}></img>
            <img src={RainyIcon} alt='' className={filterStandard === 5 ? styles.filterweatherstandard : styles.filterweathericon} onClick={() => setFilterStandard(5)}></img>
          </div>
        </div>) : null}
        <div className={styles.main}>
          {postItems}
        </div>
      </div>
      
      <MoveToTopToggle></MoveToTopToggle>
    </div>
  );
}

export default Feed;
