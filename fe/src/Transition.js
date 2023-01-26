import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage"
import PostPage from "./pages/PostPage"
import GlobalPage from "./pages/GlobalPage";
import GardenPage from "./pages/GardenPage";
import ProfilePage from "./pages/ProfilePage";
import "./Transition.css";

function Transition() {
  const location = useLocation();
  return (
    <div>
      <TransitionGroup className="transitions-wrapper">
        <CSSTransition key={location.key} classNames={`right`} timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/Home" element={<HomePage />}></Route>
            <Route path="/Post" element={<PostPage />}></Route>
            <Route path="/Global" element={<GlobalPage />}></Route>
            <Route path="/Garden" element={<GardenPage />}></Route>
            <Route path="/Profile" element={<ProfilePage />}></Route>
            {/* <Route path="/product/*" element={<Product />}></Route> */}
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default Transition;
