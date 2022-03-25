import { fetchInterface } from "../utils/interfaces";
//获取所有用户排名信息
export const getRanking = (): fetchInterface => {
  return {
    url: "/v1/scores/all",
    method: "get",
  };
};
