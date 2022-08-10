import axios from "axios";

const baseurl = "/api/v1/user";

// 获取所有题目分类
export const getCategories = () => {
  return axios.get(`${baseurl}/challenges/categories`);
};

// 获取所有题目信息
export const getAllChallenges = () => {
  return axios.get(`${baseurl}/challenges/all`);
};

// 获取指定类别的题目信息
export const getChallengesByCategory = (category: string | undefined) => {
  return axios.get(`${baseurl}/challenges/${category}`);
};
//根据id获取题目信息
export const getChallenge=(id:number)=>{
  return axios.get(`${baseurl}/challenges/id/${id}`);
}
// 提交flag
export const submitFlag = (cid: number, flag: string) => {
  return axios.post(`${baseurl}/submitflag`, { cid, flag });
};

// 获取所有正确的flag提交记录，时间从早到晚排序
export const getSolved = () => {
  return axios.get(`${baseurl}/solves/all`);
};

// 获取指定用户正确的flag提交记录
export const getSolvedByUid = (uid: string) => {
  return axios.get(`${baseurl}/solves/uid/${uid}`);
};

export const getSolvedByCid = (cid: number) => {
  return axios.get(`${baseurl}/solves/cid/${cid}`);
};

// 获取当前用户正确flag提交记录，按时间从早到晚排序
export const getSolvedByCurrentUser = () => {
  return axios.get(`${baseurl}/solves/self`);
};

// 获取当前用户分数、排名
export const getCurrentUserScore = () => {
  return axios.get(`${baseurl}/score/self`);
};

// 获取首页推荐题目
export const getRecommend=()=>{
  return axios.get(`${baseurl}/challenges/recommend`)
}