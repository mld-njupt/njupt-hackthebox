import { fetchInterface } from "../utils/interfaces";
//获取全部文章摘要
export const getAllArticles = (): fetchInterface => {
  return {
    url: "/v1/articles/all",
    method: "get",
  };
};
//获取指定文章详细信息
export const getSingleArticle = (id: any): fetchInterface => {
  return {
    url: "/v1/article",
    method: "get",
    query: {
      id,
    },
  };
};
