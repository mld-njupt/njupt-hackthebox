import { fetchInterface } from "../utils/interfaces";
//注册
const registerApi = (
  username: string,
  password: string,
  email: string,
  captchaid: string,
  solution: string
): fetchInterface => {
  return {
    url: "/v1/register",
    body: {
      username,
      password,
      email,
      captchaid,
      solution,
    },
    method: "post",
  };
};
//获取注册时的验证码
const getCaptcha = (): fetchInterface => {
  return {
    url: "/v1/captcha",
    method: "get",
  };
};
//登录
const loginApi = (loginConfig: object, remember: boolean): fetchInterface => {
  return {
    url: "/v1/login",
    body: {
      ...loginConfig,
      remember,
    },
    method: "post",
  };
};
//登录后获取用户session信息
const getSessionApi = (): fetchInterface => {
  return {
    url: "/v1/user/session",
    method: "get",
  };
};
export { registerApi, getCaptcha, loginApi, getSessionApi };
