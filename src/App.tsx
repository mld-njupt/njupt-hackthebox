import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import "./App.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Passage from "./pages/Passage/Passage";
import Home from "./pages/Home/Home";
import Env from "./pages/Env/Env";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About/About";
import Ranking from "./pages/Ranking/Ranking";
function App() {
  document.body.setAttribute("arco-theme", "dark");

  // const Login = lazy(() => import("./pages/Login/Login"));
  // const Home = lazy(() => import("./pages/Home/Home"));
  // const Env = lazy(() => import("./pages/Env/Env"));
  // const About = lazy(() => import("./pages/About/About"));
  // const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
  // const Online = lazy(() => import("./pages/Online/Online"));
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
            <Route path="env" element={<Env />} />
            <Route path="about" element={<About />} />
            <Route path="ranking" element={<Ranking />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/passage" element={<Passage/>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
