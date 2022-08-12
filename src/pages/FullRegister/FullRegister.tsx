import React, { useEffect, useState } from "react";
import { Notification } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";
import ParticleWave from "../../utils/canvasInit";
import checkValid from "../../utils/checkValid";
import { useFetch, useFocus } from "../../utils/customHooks";
import debounce from "../../utils/debounce";
import { postUserInfoApi } from "../../api/user";
import "./FullRegister.scss";
const words = {
  logo: "0xGame & X1cT34m.com",
  title: "进阶注册",
  area: "地区*",
  school: "学校*",
  age: "年龄*",
  sex: "性别*",
  major: "专业*",
  grade: "年级*",
  phone: "手机号*",
  country: "国家*",
  weChat: "微信号*",
  qq: "qq号*",
  // noaccount: "没有账号？",
  register: "注册",
  // forget: "忘记密码",
  // keepalive: "保持登录",
  go: "开启进阶之旅",
  back: "返回",
};
function FullRegister() {
  const [areaRef, areaFocus] = useFocus<HTMLInputElement>();
  const [schoolRef, schoolFocus] = useFocus<HTMLInputElement>();
  const [ageRef, ageFocus] = useFocus<HTMLInputElement>();
  const [weChatRef, weChatFocus] = useFocus<HTMLInputElement>();
  const [majorRef, majorFocus] = useFocus<HTMLInputElement>();
  const [qqRef, qqFocus] = useFocus<HTMLInputElement>();
  const [gradeRef, gradeFocus] = useFocus<HTMLInputElement>();
  const [phoneRef, phoneFocus] = useFocus<HTMLInputElement>();
  const [countryRef, countryFocus] = useFocus<HTMLInputElement>();
  const navigate = useNavigate();
  const [registerConfig, setRegisterConfig] = useState<{
    area: string;
    school: string;
    age: number | string;
    wechat: string | null;
    qq: string | null;
    major: string;
    grade: string;
    phone: "";
    country: "";
  }>({
    area: "",
    school: "",
    age: "",
    wechat: null,
    qq: null,
    major: "",
    grade: "",
    phone: "",
    country: "",
  });
  const [[fullRegisterData], fullRegister] = useFetch(
    postUserInfoApi(registerConfig)
  );
  const handleInput = (configType: string) => {
    return (e: any) => {
      if (configType === "age") {
        setRegisterConfig({
          ...registerConfig,
          [configType]: parseInt(e.target.value),
        });
      } else {
        setRegisterConfig({ ...registerConfig, [configType]: e.target.value });
      }
    };
  };
  const handleSubmit = async () => {
    try {
      await checkValid("isNull")(registerConfig.area, "area");
      await checkValid("isNull")(registerConfig.school, "school");
      await checkValid("isNull")(registerConfig.major, "major");
      await checkValid("isNull")(registerConfig.grade, "grade");
      await checkValid("isNull")(registerConfig.country, "country");
      await checkValid("isNull")(registerConfig.phone, "phone");
      await checkValid("mobilePhone")(registerConfig.phone);
      await checkValid("age")(registerConfig.age?.toString());
    } catch (error: any) {
      Notification.error({ title: "Error", content: error });
      return;
    }
    fullRegister();
  };
  useEffect(() => {
    let pw = new ParticleWave();
    pw.run();
  }, []);
  useEffect(() => {
    if (fullRegisterData && fullRegisterData.code === 200) {
      Notification.success({ title: "Success", content: "进阶成功" });
      navigate("/dashboard");
    } else {
      fullRegisterData &&
        Notification.error({ title: "Error", content: fullRegisterData.msg });
    }
  }, [fullRegisterData]);
  return (
    <div className="full-register">
      <canvas></canvas>
      <span className="full-register-logo">{words.logo}</span>
      <div className="full-register-wrap">
        <div className="full-register-full-register full-register-common">
          <div className="full-register-title">{words.title}</div>
          <div className="full-register-options">
            <div className="full-register-input">
              <span className={countryFocus ? "input-focus" : ""}>
                {words.country}
              </span>
              <input
                type="text"
                ref={countryRef}
                onChange={debounce(handleInput("country"), 500)}
              />
            </div>
            <div className="full-register-input">
              <span className={areaFocus ? "input-focus" : ""}>
                {words.area}
              </span>
              <input
                type="text"
                ref={areaRef}
                onChange={debounce(handleInput("area"), 500)}
              />
            </div>
            <div className="full-register-input">
              <span className={schoolFocus ? "input-focus" : ""}>
                {words.school}
              </span>
              <input
                type="school"
                ref={schoolRef}
                onChange={debounce(handleInput("school"), 500)}
              />
            </div>
            <div className="full-register-input">
              <span className={gradeFocus ? "input-focus" : ""}>
                {words.grade}
              </span>
              <input
                type="text"
                ref={gradeRef}
                onChange={debounce(handleInput("grade"), 500)}
              />
            </div>
            <div className="full-register-input">
              <span className={majorFocus ? "input-focus" : ""}>
                {words.major}
              </span>
              <input
                type="school"
                ref={majorRef}
                onChange={debounce(handleInput("major"), 500)}
              />
            </div>
            <div className="full-register-input">
              <span className={phoneFocus ? "input-focus" : ""}>
                {words.phone}
              </span>
              <input
                type="text"
                ref={phoneRef}
                onChange={debounce(handleInput("phone"), 500)}
              />
            </div>
            <div className="full-register-input">
              <span className={weChatFocus ? "input-focus" : ""}>
                {words.weChat}
              </span>
              <input
                type="school"
                ref={weChatRef}
                onChange={debounce(handleInput("wechat"), 500)}
              />
            </div>
            <div className="full-register-input">
              <span className={qqFocus ? "input-focus" : ""}>{words.qq}</span>
              <input
                type="school"
                ref={qqRef}
                onChange={debounce(handleInput("qq"), 500)}
              />
            </div>
            <div className="full-register-input">
              <span className={ageFocus ? "input-focus" : ""}>{words.age}</span>
              <input
                type="school"
                ref={ageRef}
                onChange={debounce(handleInput("age"), 500)}
              />
            </div>
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
