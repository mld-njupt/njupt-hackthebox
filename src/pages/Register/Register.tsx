import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "@arco-design/web-react";
import { useFetch } from "../../utils/customHooks";
import { registerConfigInterface } from "../../utils/interfaces";
import { useFocus } from "../../utils/customHooks";
import checkValid from "../../utils/checkValid";
import ParticleWave from "../../utils/canvasInit";
import debounce from "../../utils/debounce";
import { getCaptcha, registerApi } from "../../api/user";
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
  const navigate = useNavigate();
  const [usernameRef, usernameFocus] = useFocus<HTMLInputElement>();
  const [passwordRef, passwordFocus] = useFocus<HTMLInputElement>();
  const [emailRef, emailFocus] = useFocus<HTMLInputElement>();
  const [codeRef, codeFocus] = useFocus<HTMLInputElement>();
  const [confirmRef, confirmFocus] = useFocus<HTMLInputElement>();
  const [registerConfig, setRegisterConfig] = useState<registerConfigInterface>(
    {
      username: "",
      password: "",
      confirm: "",
      email: "",
      code: "",
    }
  );
  const [[codeData], getCodeData] = useFetch(getCaptcha());
  const [[registerData], register] = useFetch(
    registerApi(
      registerConfig.username,
      registerConfig.password,
      registerConfig.email,
      codeData && codeData.data.id,
      registerConfig.code
    )
  );
  const handleInput = (configType: string) => {
    return (e: any) => {
      setRegisterConfig({ ...registerConfig, [configType]: e.target.value });
    };
  };
  const handleSubmit = async () => {
    try {
      await checkValid("isNull")(registerConfig.username, "username");
      await checkValid("isNull")(registerConfig.password, "password");
      await checkValid("isNull")(registerConfig.email, "email");
      await checkValid("isNull")(registerConfig.code, "code");
      await checkValid("email")(registerConfig.email);
      await checkValid("confirm")(
        registerConfig.password,
        registerConfig.confirm
      );
    } catch (error: any) {
      Notification.error({ title: "Error", content: error });
      return;
    }
    register();
  };
  const changeCode = () => {
    getCodeData();
  };
  useEffect(() => {
    getCodeData();
  }, []);
  useEffect(() => {
    let pw = new ParticleWave();
    pw.run();
  }, []);
  useEffect(() => {
    if (registerData && registerData.code === 200) {
      Notification.success({ title: "Success", content: "注册成功" });
      navigate("/login");
    } else {
      registerData &&
        Notification.error({ title: "Error", content: registerData.msg });
        getCodeData()
    }
  }, [registerData]);
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
              type="password"
            />
          </div>
          <div className="register-input">
            <span className={confirmFocus ? "input-focus" : ""}>
              {words.confirmPassword}
            </span>
            <input
              ref={confirmRef}
              onChange={debounce(handleInput("confirm"), 500)}
              type="password"
            />
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
              onClick={changeCode}
              className="verification-code-img"
              src={codeData ? `data:image/gif;base64,${codeData.data.b64}` : ""}
              alt=""
              style={{
                background: "white",
                cursor: "pointer",
                width: "100px",
                height: "33px",
                float: "right",
              }}
            />
          </div>
          <div className="register-submit" onClick={handleSubmit}>
            {words.register}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
