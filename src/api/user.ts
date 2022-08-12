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
export const loginApi = (loginConfig: object): fetchInterface => {
  return {
    url: "/v1/login",
    body: {
      ...loginConfig,
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
export const updateInfoApi = (user: {
  username: string;
  password: string;
  email: string;
}): fetchInterface => {
  return {
    url: "/v1/user/updateInfo",
    method: "put",
    body: user,
  };
};

//获取用户排名
export const getSelfApi = (): fetchInterface => {
  return {
    url: "/v1/user/score/self",
    method: "get",
  };
};

//获取用户各个方向得分
export const getScoreApi = (): fetchInterface => {
  return {
    url: "/v1/user/solves/self/status",
    method: "get",
  };
};

//获取用户信息
export const getUserInfoApi = (): fetchInterface => {
  return {
    url: "/v1/user/info/detail",
    method: "get",
  };
};

//修改用户信息
export const putUserInfoApi = (userInfo: {
  age: string | number | null;
  area: string;
  country: string;
  grade: string;
  major: string;
  phone: string;
  qq: string;
  school: string;
  wechat: string;
}): fetchInterface => {
  return {
    url: "/v1/user/info/detail",
    method: "put",
    body: userInfo,
  };
};

//完整注册
export const postUserInfoApi = (userInfo: {
  age: string | number | null;
  area: string;
  country: string;
  grade: string;
  major: string;
  phone: string;
  qq: string | null;
  school: string;
  wechat: string | null;
}): fetchInterface => {
  return {
    url: "/v1/user/info/detail",
    method: "post",
    body: userInfo,
  };
};
