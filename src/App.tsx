import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import "./App.scss";

function App() {
  const Login = lazy(() => import("./pages/Login/Login"));
  const Home = lazy(() => import("./pages/Home/Home"));
  const Env = lazy(() => import("./pages/Env/Env"));
  const About = lazy(() => import("./pages/About/About"));
  const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
  const Online = lazy(() => import("./pages/Online/Online"));
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
