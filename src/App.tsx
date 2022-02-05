import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "@arco-design/web-react";
import "./App.scss";

function App() {
  const Login = lazy(() => import("./pages/Login/Login"));
  console.log(Login);
  // console.log(<Login />);
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
