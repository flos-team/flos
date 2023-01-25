import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./Router.css";

function Router() {
  const location = useLocation();
  return (
    <div>
      <TransitionGroup className="transitions-wrapper">
        <CSSTransition key={location.key} classNames={`right`} timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />}></Route>
            {/* <Route path="/product/*" element={<Product />}></Route> */}
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default Router;
