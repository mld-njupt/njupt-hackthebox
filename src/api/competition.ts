import axios from "axios";

const baseurl = "/v1/user";

// 获取所有题目分类
export const getCategories = () => {
  return axios.get(`${baseurl}/categories`);
};

// 获取所有题目信息
export const getAllChallenges = () => {
  return axios.get(`${baseurl}/challenges/all`);
};

// 获取指定类别的题目信息
export const getChallengesByCategory = (category: string | undefined) => {
  return axios.get(`${baseurl}/challenges/${category}`);
};

// 提交flag
export const submitFlag = (cid: number, flag: string) => {
  return axios.post(`${baseurl}/submitflag`, { cid, flag });
};

// 获取所有正确的flag提交记录，时间从早到晚排序
export const getSolved = () => {
  return axios.get(`${baseurl}/solves/all`);
};

// 获取指定用户正确的flag提交记录
export const getSolvedByCategory = (uid: string) => {
  return axios.get(`${baseurl}/solves/uid/${uid}`);
};

// 获取当前用户正确flag提交记录，按时间从早到晚排序
export const getSolvedByCurrentUser = () => {
  return axios.get(`${baseurl}/solves/self`);
};

// 获取当前用户分数、排名
export const getCurrentUserScore = () => {
  return axios.get(`${baseurl}/score/self`);
};
