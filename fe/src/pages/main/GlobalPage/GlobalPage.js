import React, { useState, useEffect } from "react";
import {
  getPostList,
  getPostListByWeather,
  getPostListByComment,
  getPostListByNickname,
  getPostListByTagName,
} from "../../../api/PostAPI";

import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import MoveToTopToggle from "../../../components/MoveToTop/MoveToTopToggle";
import PostItem from "../../../components/PostItem/PostItem";

import SearchIcon from "../../../assets/GlobalAsset/Search.png";
import FilterIcon from "../../../assets/GlobalAsset/Filter.png";
import SunnyIcon from "../../../assets/GlobalAsset/sunny.png";
import CloudyIcon from "../../../assets/GlobalAsset/cloudy.png";
import RainyIcon from "../../../assets/GlobalAsset/rainy.png";

import styles from "./GlobalPage.module.css";
import "./GlobalPageStyle.css";

function Global() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);

  const [filtering, setFiltering] = useState(false); // 필터링 아이콘 누른 상태 확인
  const [filterStandard, setFilterStandard] = useState(1); // 정렬 기준 (1: 최신순 2: 댓글 많은 순 3: 맑음 4: 흐림 5: 비)
  const [searchInput, setSearchInput] = useState(""); // 검색 : # 포함 -> 태그검색, # 미포함 -> 사용자검색
  const [isSearching, setIsSearching] = useState(false);

  const [nextPage, setNextPage] = useState(0);
  const [hasNext, SetHasNext] = useState(false);

  // 기본 렌더링 = 최신순
  useEffect(() => {
    getPostList().then((response) => {
      // console.log(response);
      setPosts(response.postList);
      setNextPage(response.nextPage);
      SetHasNext(response.hasNext);
    });
  }, []);

  // 입력값이 변경할 때마다 발동
  useEffect(() => {
    onFilter();
  }, [filterStandard]);

  useEffect(() => {
    // newPost가 새로 갱신되면
    // posts에 newPosts를 붙힌다.
    if (newPosts.length >= 1) {
      // console.log(posts);
      // console.log(newPosts);
      setPosts([...posts, ...newPosts]);
    }
  }, [newPosts]);

  // 상태관리에 따른 필터
  const onFilter = () => {
    if (filterStandard === 1) {
      getPostList().then((response) => {
        setPosts(response.postList);
        setNextPage(response.nextPage);
        SetHasNext(response.hasNext);
        setIsSearching(false);
      });
    } else if (filterStandard === 2) {
      getPostListByComment().then((response) => {
        setPosts(response.content);
        setNextPage(response.nextPage);
        SetHasNext(response.hasNext);
        setIsSearching(false);
      });
    } else if (filterStandard === 3) {
      getPostListByWeather("SUNNY").then((response) => {
        setPosts(response.content);
        setNextPage(response.nextPage);
        SetHasNext(response.hasNext);
        setIsSearching(false);
      });
    } else if (filterStandard === 4) {
      getPostListByWeather("CLOUDY").then((response) => {
        setPosts(response.content);
        setNextPage(response.hasNext);
        SetHasNext(response.isLast);
        setIsSearching(false);
      });
    } else if (filterStandard === 5) {
      getPostListByWeather("RAINY").then((response) => {
        setPosts(response.content);
        setNextPage(response.nextPage);
        SetHasNext(response.hasNext);
        setIsSearching(false);
      });
    }
  };

  // console.log(posts);
  const postList = posts.map((key) => <PostItem post={key}></PostItem>);

  // 필터 이동하면 스크롤을 상단으로 이동시킨다.
  const MoveToTop = () => {
    const top = document.getElementById("postMain").children.item(0);
    top.scrollIntoView(false, { behavior: "smooth" });
  };

  const clickFilterIcon = () => {
    setFiltering((pre) => !pre);
  };

  // 검색기능
  // 입력값이 변경할 때마다 발동하는 함수
  const searchValue = (e) => {
    // 태그 검색
    if (e.target.value.substr(0, 1) === "#" && e.target.value.length >= 2) {
      getPostListByTagName(e.target.value.substr(1).toLowerCase()).then((response) => {
        setIsSearching(true);
        setSearchInput(e.target.value);
        setPosts([...response.content]);
      });
    }
    // 사용자 검색
    else if (e.target.value.substr(0, 1) !== "#" && e.target.value.length >= 1) {
      getPostListByNickname(e.target.value.toLowerCase()).then((response) => {
        if (response.content) {
          setIsSearching(true);
          setSearchInput(e.target.value);
          setPosts(response.content);
        } else {
          setSearchInput(e.target.value);
          setIsSearching(true);
          setPosts([]);
        }
      });
    }
    // 검색하다가 비웠을 때
    else if (e.target.value.length === 0) {
      getPostList().then((response) => {
        setPosts([...response.postList]);
        setIsSearching(false);
      });
    }
  };

  const handleScroll = (e) => {
    // const pos = e.target.scrollHeight - e.target.scrollTop;
    // console.log(pos);
    // console.log(e.target);
    // if (pos < 1100 && hasNext.client) {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight && hasNext) {
      switch (filterStandard) {
        case 1:
          getPostList(nextPage).then((response) => {
            // console.log(response);
            setNewPosts(response.postList);
            setNextPage(response.nextPage);
            SetHasNext(response.hasNext);
            setIsSearching(false);
          });
          break;
        case 2:
          getPostListByComment(nextPage).then((response) => {
            setNewPosts(response.content);
            setNextPage(response.nextPage);
            SetHasNext(response.hasNext);
            setIsSearching(false);
          });
          break;
        case 3:
          getPostListByWeather("SUNNY", nextPage).then((response) => {
            setNewPosts(response.content);
            setNextPage(response.nextPage);
            SetHasNext(response.hasNext);
            setIsSearching(false);
          });
          break;
        case 4:
          getPostListByWeather("CLOUDY", nextPage).then((response) => {
            setNewPosts(response.content);
            setNextPage(response.nextPage);
            SetHasNext(response.hasNext);
            setIsSearching(false);
          });
          break;
        case 5:
          getPostListByWeather("RAINY", nextPage).then((response) => {
            setNewPosts(response.content);
            setNextPage(response.nextPage);
            SetHasNext(response.hasNext);
            setIsSearching(false);
          });
          break;
      }
    }
  };

  const noPost = <div>게시물이 없습니다.</div>;
  const searchResult = (
    <>
      <div>"{searchInput}"에 대한 검색 결과입니다.</div>
    </>
  );
  const noSearchResult = <div>"{searchInput}"에 대한 검색 결과가 없습니다.</div>;

  return (
    <div className="global-page-container">
      <HeaderComponent pageName={"둘러보기"} optType={0}></HeaderComponent>
      <div className="global-page-root">
        <div className="global-search-div">
          <img src={SearchIcon} className="search-icon" alt=""></img>
          <input className="search-input" alt="" onChange={searchValue}></input>
          <img src={FilterIcon} className="filter-btn" alt="" onClick={clickFilterIcon}></img>
        </div>
        {/* 필터 아이콘 누른 상태 */}
        {filtering ? (
          <div className={`${styles.filterselectbox} filter-div`}>
            <div className={styles.filtertextdiv}>
              <span
                className={filterStandard === 1 ? styles.filtertextstandard : styles.filtertext}
                onClick={() => {
                  MoveToTop();
                  setFilterStandard(1);
                  setIsSearching(false);
                }}
              >
                최신순
              </span>
              <span
                className={filterStandard === 2 ? styles.filtertextstandard : styles.filtertext}
                onClick={() => {
                  MoveToTop();
                  setFilterStandard(2);
                  setIsSearching(false);
                }}
              >
                댓글 많은 순
              </span>
            </div>
            <div className={styles.filtertextdiv}>
              <img
                src={SunnyIcon}
                alt=""
                className={filterStandard === 3 ? styles.filterweatherstandard : styles.filterweathericon}
                onClick={() => {
                  MoveToTop();
                  setFilterStandard(3);
                  setIsSearching(false);
                }}
              ></img>
              <img
                src={CloudyIcon}
                alt=""
                className={filterStandard === 4 ? styles.filterweatherstandard : styles.filterweathericon}
                onClick={() => {
                  MoveToTop();
                  setFilterStandard(4);
                  setIsSearching(false);
                }}
              ></img>
              <img
                src={RainyIcon}
                alt=""
                className={filterStandard === 5 ? styles.filterweatherstandard : styles.filterweathericon}
                onClick={() => {
                  MoveToTop();
                  setFilterStandard(5);
                  setIsSearching(false);
                }}
              ></img>
            </div>
          </div>
        ) : null}
        <div className={`${styles.main} ${styles.scroll}`} id="postMain" onScroll={handleScroll}>
          {isSearching ? (posts.length === 0 ? noSearchResult : searchResult) : posts.length === 0 ? noPost : postList}
        </div>
      </div>

      <MoveToTopToggle></MoveToTopToggle>
    </div>
  );
}

export default Global;
