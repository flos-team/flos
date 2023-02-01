import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LandingPage from "./pages/landing/LandingPage";
import LandingPage1 from "./pages/landing/LandingPage1";

import MainPage from "./pages/main/MainPage/MainPage";
import LoginPage from "./pages/LoginPage";
import FeedDetailPage from "./pages/main/FeedPage/FeedDetailPage";

import MainPage from "./pages/main/MainPage";
import LoginPage from "./pages/LoginPage";
import FeedDetailPage from "./pages/main/FeedPage/FeedDetailPage";
import WritePostPage from "./pages/main/WritePostPage/WritePostPage"

import FillPage from "./pages/register/FillPage";
import ResultPage from "./pages/register/ResultPage"
import PwChangePage from "./pages/password/ChangePage"
import PwFindPage from "./pages/password/FindPage"

import SettingPage from "./pages/SettingPage"
import NotificationPage from "./pages/NotificationPage"
import GuidePage from "./pages/GuidePage"
import "./Transition.css";

function Transition() {
  const location = useLocation();
  return (
    <div>
      <TransitionGroup className="transitions-wrapper">
        <CSSTransition key={location.key} classNames={`right`} timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/landing1" element={<LandingPage1 />}></Route>

            <Route path="/main" element={<MainPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route> 
            <Route path="/feed" element={<FeedDetailPage />}></Route>
            <Route path="/main/write" element = {<WritePostPage />}></Route>

            <Route path="/register/fill" element={<FillPage />}></Route>
            <Route path="/register/result" element={<ResultPage />}></Route>
            <Route path="/pwchange" element={<PwChangePage />}></Route>
            <Route path="/pwfind" element={<PwFindPage />}></Route>
            
            <Route path="/settings" element={<SettingPage />}></Route>
            <Route path="/notification" element={<NotificationPage />}></Route>
            <Route path="/guide" element={<GuidePage />}></Route>



            {/* <Route path="/product/*" element={<Product />}></Route> */}
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>

      
    </div>
  );
}

export default Transition;
