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

// 获取所有题目分类
export const getCategoriesApi = (): fetchInterface => {
  return {
    url: "/v1/user/categories",
    method: "get",
  };
};

// 获取所有题目信息
export const getAllChallengesApi = (): fetchInterface => {
  return {
    url: "/v1/user/challenges/all",
    method: "get",
  };
};

// 获取指定类别的题目信息
export const getSpecificCategoryChallengesApi = (
  category: string
): fetchInterface => {
  return {
    url: `/v1/user/challenges/${category}`,
    method: "get",
  };
};

// 提交flag
export const submitFlagApi = (cid: number, flag: string): fetchInterface => {
  return {
    url: "/v1/user/submitflag",
    method: "post",
    body: {
      cid,
      flag,
    },
  };
};

// 获取所有正确的flag提交记录，时间从早到晚排序
export const getAllSolvesApi = (): fetchInterface => {
  return {
    url: "/v1/user/solves/all",
    method: "get",
  };
};

// 获取指定用户正确的flag提交记录
export const getAllSolvesByCategoryApi = (uid: string): fetchInterface => {
  return {
    url: `/v1/user/solves/uid/${uid}`,
    method: "get",
  };
};

// 获取当前用户正确flag提交记录，按时间从早到晚排序
export const getCurrentUserSolvesApi = (): fetchInterface => {
  return {
    url: "/v1/user/solves/self",
    method: "get",
  };
};

// 获取当前用户分数、排名
export const getCurrentUserScoreApi = (): fetchInterface => {
  return {
    url: "/v1/user/score/self",
    method: "get",
  };
};
