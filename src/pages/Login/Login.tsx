import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Notification } from "@arco-design/web-react";
import { useFocus, useFetch } from "../../utils/customHooks";
import ParticleWave from "../../utils/canvasInit";
import debounce from "../../utils/debounce";
import checkValid from "../../utils/checkValid";
import { loginApi } from "../../api/user";
import "./Login.scss";
// const menus = [
//   {
//     text: "© CTF",
//     key: "Dashboard",
//   },
//   {
//     text: "Contact",
//     key: "Env",
//   },
//   {
//     text: "Service",
//     key: "Online",
//   },
//   {
//     text: "Police",
//     key: "About",
//   },
// ];
const words = {
  logo: "0xGame & X1cT34m.com",
  title: "登录",
  account: "账号",
  password: "密码",
  register: "前往注册",
  noaccount: "没有账号？",
  forget: "忘记密码",
  keepalive: "保持登录",
  login: "登录",
};
const Login = function () {
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
  const [[loginData, loginLoading], login] = useFetch(loginApi(loginConfig));
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
    login();
  };
  useEffect(() => {
    let pw = new ParticleWave();
    pw.run();
  }, []);
  useEffect(() => {
    if (loginData && loginData.code === 200) {
      Notification.success({ title: "Success", content: "登录成功" });
      navigate("/dashboard");
    } else {
      loginData &&
        Notification.error({ title: "Error", content: loginData.msg });
    }
  }, [loginData]);
  return (
    <div className="login">
      <canvas></canvas>
      <span className="login-logo">{words.logo}</span>
      <div className="login-wrap">
        <div className="login-login login-common">
          <div className="login-title">{words.title}</div>
          <div className="login-input">
            <span className={usernameFocus ? "input-focus" : ""}>
              {words.account}
            </span>
            <input
              type="text"
              ref={usernameRef}
              onChange={debounce(handleInput("username"), 500)}
            />
          </div>
          <div className="login-input">
            <span className={passwordFocus ? "input-focus" : ""}>
              {words.password}
            </span>
            <input
              type="password"
              ref={passwordRef}
              onChange={debounce(handleInput("password"), 500)}
            />
          </div>
          <div className="login-alive-forget">
            <div className="login-alive">
              <Checkbox
                onChange={(checked) => {
                  setLoginConfig((prev) => {
                    return { ...prev, remember: checked };
                  });
                }}
              ></Checkbox>{" "}
              {words.keepalive}
            </div>
            <div className="login-forget">{words.forget}</div>
          </div>
          <div className="login-submit" onClick={handleSubmit}>
            {words.login}
          </div>
        </div>
        <div className="login-register login-common">
          <div className="login-noaccount">{words.noaccount}</div>
          <div className="login-gotoregister" onClick={toRegister}>
            <span>{words.register}</span>
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
};
export default Login;
