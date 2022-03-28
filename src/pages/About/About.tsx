import React,{ useEffect } from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { useFetch } from "../../utils/customHooks";
import formDate from "../../utils/formatDate";
import { getAllArticles } from "../../api/passage";
import "./About.scss";
const About = () => {
  const [[articles], getArticles] = useFetch(getAllArticles());
  useEffect(() => {
    getArticles();
  }, []);
  useEffect(() => {}, [articles]);
  return (
    <div className="about-warp">
      <div className="articles-list">
        <ArticleCard></ArticleCard>
      </div>
    </div>
  );
};
export default React.memo(About);
