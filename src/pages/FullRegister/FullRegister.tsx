import React, { useEffect, useState } from "react";
import { Checkbox, Notification } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import ParticleWave from "../../utils/canvasInit";
import checkValid from "../../utils/checkValid";
import { useFetch, useFocus } from "../../utils/customHooks";
import debounce from "../../utils/debounce";
import "./FullRegister.scss";
const words = {
  logo: "0xGame & X1cT34m.com",
  title: "进阶注册",
  location: "地区",
  school: "学校",
  age: "年龄",
  sex: "性别",
  noaccount: "没有账号？",
  register: "注册",
  // forget: "忘记密码",
  // keepalive: "保持登录",
  go: "开启进阶之旅",
};
function FullRegister() {
  const [usernameRef, usernameFocus] = useFocus<HTMLInputElement>();
  const [passwordRef, passwordFocus] = useFocus<HTMLInputElement>();
  const [loginConfig, setLoginConfig] = useState<{
    username: string;
    password: string;
    remember: boolean;
  }>({
    username: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  const toRegister = () => {
    navigate("/register");
  };
  const handleInput = (configType: string) => {
    return (e: any) => {
      setLoginConfig({ ...loginConfig, [configType]: e.target.value });
    };
  };
  const handleSubmit = async () => {
    try {
      await checkValid("isNull")(loginConfig.username, "username");
      await checkValid("isNull")(loginConfig.password, "password");
    } catch (error: any) {
      Notification.error({ title: "Error", content: error });
      return;
    }
    // login();
  };
  useEffect(() => {
    let pw = new ParticleWave();
    pw.run();
  }, []);
  // useEffect(() => {
  //   if (loginData && loginData.code === 200) {
  //     Notification.success({ title: "Success", content: "登录成功" });
  //     navigate("/dashboard");
  //   } else {
  //     loginData &&
  //       Notification.error({ title: "Error", content: loginData.msg });
  //   }
  // }, [loginData]);
  return (
    <div className="full-register">
      <canvas></canvas>
      <span className="full-register-logo">{words.logo}</span>
      <div className="full-register-wrap">
        <div className="full-register-full-register full-register-common">
          <div className="full-register-title">{words.title}</div>
          <div className="full-register-input">
            <span className={usernameFocus ? "input-focus" : ""}>
              {words.location}
            </span>
            <input
              type="text"
              ref={usernameRef}
              onChange={debounce(handleInput("username"), 500)}
            />
          </div>
          <div className="full-register-input">
            <span className={passwordFocus ? "input-focus" : ""}>
              {words.school}
            </span>
            <input
              type="password"
              ref={passwordRef}
              onChange={debounce(handleInput("password"), 500)}
            />
          </div>
          <div className="full-register-input">
            <span className={passwordFocus ? "input-focus" : ""}>
              {words.sex}
            </span>
            <input
              type="password"
              ref={passwordRef}
              onChange={debounce(handleInput("password"), 500)}
            />
          </div>
          <div className="full-register-input">
            <span className={passwordFocus ? "input-focus" : ""}>
              {words.age}
            </span>
            <input
              type="password"
              ref={passwordRef}
              onChange={debounce(handleInput("password"), 500)}
            />
          </div>
          <div className="full-register-submit" onClick={handleSubmit}>
            {words.go}
          </div>
        </div>
      </div>
      {/* <div className="login-polices">
      <div v-for="(item, idx) in menus" :key="idx" className="login-police">
        {{ item.text }}
      </div>
    </div> */}
    </div>
  );
}

export default FullRegister;
