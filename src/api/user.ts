import { fetchInterface } from "../utils/interfaces";

// 注册
export const registerApi = (
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

// 获取注册时的验证码
export const getCaptcha = (): fetchInterface => {
  return {
    url: "/v1/captcha",
    method: "get",
  };
};

// 登录
export const loginApi = (
  loginConfig: object,
  remember: boolean
): fetchInterface => {
  return {
    url: "/v1/login",
    body: {
      ...loginConfig,
      remember,
    },
    method: "post",
  };
};

// 登录后获取用户session信息
export const getSessionApi = (): fetchInterface => {
  return {
    url: "/v1/user/session",
    method: "get",
  };
};

// 用户注销
export const logoutApi = (): fetchInterface => {
  return {
    url: "/v1/user/logout",
    method: "get",
  };
};

// 更新用户信息
export const updateInfoApi = (
  username: string,
  password: string,
  email: string,
  affiliation: string,
  country: string
): fetchInterface => {
  return {
    url: "/v1/user/updateInfo",
    method: "post",
    body: {
      username,
      password,
      email,
      affiliation,
      country,
    },
  };
};
