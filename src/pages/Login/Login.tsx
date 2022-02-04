import { useEffect } from "react";
import ParticleWave from "../../utils/canvasInit";
import "./Login.scss";
const Login = function () {
  const menus = [
    {
      text: "© CTF",
      key: "Dashboard",
    },
    {
      text: "Contact",
      key: "Env",
    },
    {
      text: "Service",
      key: "Online",
    },
    {
      text: "Police",
      key: "About",
    },
  ];
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
  useEffect(() => {
    let pw = new ParticleWave();
    pw.run();
  }, []);
  return (
    <div className="login">
      <canvas></canvas>
      <span className="login-logo">{words.logo}</span>
      <div className="login-wrap">
        <div className="login-login login-common">
          <div className="login-title">{words.title}</div>
          <div className="login-input">
            <span>{words.account}</span>
            <input type="text" />
          </div>
          <div className="login-input">
            <span>{words.password}</span>
            <input type="password" />
          </div>
          <div className="login-alive-forget">
            <div className="login-alive">{words.keepalive}</div>
            <div className="login-forget">{words.forget}</div>
          </div>
          <div className="login-submit">{words.login}</div>
        </div>
        <div className="login-register login-common">
          <div className="login-noaccount">{words.noaccount}</div>
          <div className="login-gotoregister">
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