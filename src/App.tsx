import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import "./App.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FullRegister from "./pages/FullRegister/FullRegister";
import Passage from "./pages/Passage/Passage";
import Home from "./pages/Home/Home";
import Env from "./pages/Env/Env";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import Ranking from "./pages/Ranking/Ranking";
import UserProfile from "./pages/UserProfile/UserProfile";
import Exercise from "./pages/Exercise/Exercise";
function App() {
  document.body.setAttribute("arco-theme", "dark");
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="spin-wrap">
            <Spin></Spin>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="env" element={<Env />}>
              {/* <Route path="exercise" element={<Exercise />} /> */}
            </Route>
            <Route path="about" element={<About />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="userprofile" element={<UserProfile />} />
            <Route index element={<Dashboard></Dashboard>}></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/fullRegister" element={<FullRegister />}></Route>
          <Route path="/passage" element={<Passage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
