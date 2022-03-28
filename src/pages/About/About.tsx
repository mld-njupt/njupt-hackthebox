import React,{ useEffect } from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { useFetch } from "../../utils/customHooks";
import formDate from "../../utils/formatDate";
import Loading from "../../components/Loading/Loading";
import { getAllArticles } from "../../api/passage";
import "./About.scss";
const About = () => {
  const [[articles], getArticles] = useFetch(getAllArticles());
  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div className="about-warp">
      <div className="articles-list">
        {articles?articles.data.map((value:any,index:any)=>{
         return <ArticleCard key={index} id={value.id} title={value.title} author={value.author} image={value.image} time={formDate(value.created_at.toString())}></ArticleCard>
        }):<Loading></Loading>}
      </div>
    </div>
  );
};
export default React.memo(About);
