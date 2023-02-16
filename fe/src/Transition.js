import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LandingPage from "./pages/landing/LandingPage";
import LandingPage1 from "./pages/landing/LandingPage1";

import MainPage from "./pages/main/MainPage/MainPage";
import LoginPage from "./pages/LoginPage";

import AdminPage from "./pages/main/AdminPage/AdminPage";
import MemberManagePage from "./pages/main/AdminPage/MemberManagePage";

import PostDetailPage from "./pages/main/FeedPage/PostDetailPage/PostDetailPage";
import WritePostPage from "./pages/main/WritePostPage/WritePostPage";

import FillPage from "./pages/register/FillPage";
import ResultPage from "./pages/register/ResultPage";
import PwChangePage from "./pages/password/ChangePage";
import PwFindPage from "./pages/password/FindPage";

import UserStatisticsPage from "./pages/main/ProfilePage/UserStatisticsPage/UserStatisticsPage";
import ProfileModifyPage from "./pages/main/ProfilePage/ProfileModifyPage/ProfileModifyPage";
import OtherProfilePage from "./pages/main/ProfilePage/OtherProfilePage/OtherProfilePage";

import SettingPage from "./pages/main/ProfilePage/SettingPage/SettingPage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import GuidePage from "./pages/GuidePage";
import EndingPage from "./pages/main/EndingPage/EndingPage";
import FollowerViewPage from "./pages/FollowerViewPage/FollowerViewPage";

import NotFoundPage from "./pages/NotFoundPage";

import "./Transition.css";

function Transition() {
  const location = useLocation();
  return (
    <div>
      <TransitionGroup className="transitions-wrapper">
        {/* <CSSTransition key={location.key} classNames={`right`} timeout={300}> */}
        <Routes location={location}>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/landing1" element={<LandingPage1 />}></Route>

          <Route path="/main" element={<MainPage />}></Route>

          <Route path = "/admin" element = {<AdminPage/>}> </Route>
          <Route path = "/admin/memberManager" element = {<MemberManagePage/>}> </Route>
          
          <Route path="/login" element={<LoginPage />}></Route>

          {/* <Link to ={`/post/${1}`} > 로 전달 */}
          <Route path="/main/post/:id" element={<PostDetailPage />}></Route>
          <Route path="/main/write" element={<WritePostPage />}></Route>

          <Route path="/register/fill" element={<FillPage />}></Route>
          <Route path="/register/result" element={<ResultPage />}></Route>
          <Route path="/pwchange" element={<PwChangePage />}></Route>
          <Route path="/pwfind" element={<PwFindPage />}></Route>

          <Route path="/dashboard" element={<UserStatisticsPage />}></Route>

          <Route path="/settings" element={<SettingPage />}></Route>
          <Route path="/notification" element={<NotificationPage />}></Route>
          <Route path="/guide" element={<GuidePage />}></Route>

          <Route path="/profile-modify" element={<ProfileModifyPage />}></Route>
          <Route path="/other-profile-page/:id" element={<OtherProfilePage />}></Route>
          <Route path="/follower-view-page" element={<FollowerViewPage />}></Route>
          <Route path="/flower-end-page/:id" element={<EndingPage />}></Route>
          <Route path="/follower-view-page/:id" element={<FollowerViewPage />}></Route>

          <Route path="*" element={<NotFoundPage />}></Route>

          {/* <Route path="/product/*" element={<Product />}></Route> */}
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
        </Routes>
        {/* </CSSTransition> */}
      </TransitionGroup>
    </div>
  );
}

export default Transition;
