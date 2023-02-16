import React from "react";
// import styles from "./AdminPage.module.css";
import styles from "./MemberManagePage.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getMaliciousList,
  postHandleReport,
  getMemberList,
} from "../../../api/ReportAPI";

function MemberManagePage() {
  const [lists, setLists] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    getMemberList().then((response) => {
      setLists(response);
      setIsLoad(true);
      console.log(response);
    });
  }, []);

  let viewList = "";

  if (isLoad) {
    viewList = lists.map((key) => {
      return (
        <div className={styles.tablecontainer}>
          <div className={styles.pk}>{key.id}</div>
          <div className={styles.reporter}>{key.email}</div>
          <div className={styles.defendant}>{key.nickname}</div>
        </div>
      );
    });
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrap}>
          <div className={styles.footer}>
            <Link to="/memberManager">
              <div>회원 관리</div>
            </Link>
            <Link to="/admin">
              <div>신고 관리</div>
            </Link>
            <Link to="/main">
              <div>서비스로 이동</div>
            </Link>
          </div>
        </div>
        <h1>회원 목록</h1>
        <div className={styles.tablecontainer}>
          <div className={styles.pkTitle}>pk</div>
          <div className={styles.reporterTitle}>이메일</div>
          <div className={styles.defendant}>닉네임</div>
        </div>

        {viewList}
        

      </div>
    </>
  );
}

export default MemberManagePage;
