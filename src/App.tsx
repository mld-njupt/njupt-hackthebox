import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import "./App.scss";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Env from "./pages/Env/Env";
import Dashboard from "./pages/Dashboard/Dashboard";
import Online from "./pages/Online/Online";
import About from "./pages/About/About";
function App() {
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
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/env" element={<Env />} />
            <Route path="/about" element={<About />} />
            <Route path="/online" element={<Online />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
