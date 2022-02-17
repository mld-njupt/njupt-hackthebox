import { useEffect, useState } from "react";
import { registerConfigInterface } from "../../utils/interfaces";
import { useFocus } from "../../utils/customHooks";
import ParticleWave from "../../utils/canvasInit";
import debounce from "../../utils/debounce";
import "./Register.scss";
const words = {
  logo: "0xGame & X1cT34m.com",
  title: "注册",
  email: "邮箱",
  account: "用户名",
  password: "密码",
  confirmPassword: "确认密码",
  verificationCode: "验证码",
  register: "注册",
};
const Register = () => {
  const [usernameRef, usernameFocus] = useFocus<HTMLInputElement>();
  const [passwordRef, passwordFocus] = useFocus<HTMLInputElement>();
  const [emailRef, emailFocus] = useFocus<HTMLInputElement>();
  const [codeRef, codeFocus] = useFocus<HTMLInputElement>();
  const [confirmRef, confirmFocus] = useFocus<HTMLInputElement>();
  const [registerConfig, setRegisterConfig] = useState<registerConfigInterface>(
    {
      username: "",
      password: "",
      email: "",
      code: 0,
    }
  );
  const handleInput = (configType: string) => {
    return (e: any) => {
      setRegisterConfig({ ...registerConfig, [configType]: e.target.value });
    };
  };
  useEffect(() => {
    console.log(registerConfig);
  }, [registerConfig]);
  useEffect(() => {
    let pw = new ParticleWave();
    pw.run();
  }, []);
  return (
    <div className="register-wrap">
      <canvas></canvas>
      <span className="register-logo">{words.logo}</span>
      <div className="register-input-wrap">
        <div className="register-register">
          <div className="register-title">{words.title}</div>
          <div className="register-input">
            <span className={emailFocus ? "input-focus" : ""}>
              {words.email}
            </span>
            <input
              ref={emailRef}
              onChange={debounce(handleInput("email"), 500)}
              type="text"
            />
          </div>
          <div className="register-input">
            <span className={usernameFocus ? "input-focus" : ""}>
              {words.account}
            </span>
            <input
              ref={usernameRef}
              onChange={debounce(handleInput("username"), 500)}
              type="text"
            />
          </div>
          <div className="register-input">
            <span className={passwordFocus ? "input-focus" : ""}>
              {words.password}
            </span>
            <input
              ref={passwordRef}
              onChange={debounce(handleInput("password"), 500)}
              type="text"
            />
          </div>
          <div className="register-input">
            <span className={confirmFocus ? "input-focus" : ""}>
              {words.confirmPassword}
            </span>
            <input ref={confirmRef} type="text" />
          </div>
          <div className="register-input">
            <span
              className={codeFocus ? "input-focus" : ""}
              style={{ display: "block" }}
            >
              {words.verificationCode}
            </span>
            <input
              className="code-input"
              ref={codeRef}
              onChange={debounce(handleInput("code"), 500)}
              type="text"
            />
            <img
              className="verification-code-img"
              src="https://www.baidu.com/img/flexible/logo/pc/result.png"
              alt="xxx"
              style={{
                width: "100px",
                height: "33px",
                float: "right",
              }}
            />
          </div>
          <div className="register-submit">{words.register}</div>
        </div>
      </div>
    </div>
  );
};
export default Register;
