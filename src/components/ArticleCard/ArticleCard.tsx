
import React,{useState,useRef, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { getSingleArticle } from "../../api/passage";
import { useFetch ,useIntersectionObserver } from "../../utils/customHooks";
import { articlrCard } from "../../utils/interfaces";
import Loading from "../Loading/Loading";
import "./ArticleCard.scss";
function ArticleCard(props:articlrCard) {
  const {id,time,image,title,author}=props
  const ref=useRef<HTMLDivElement>(null)
  const [detailVisible,setDetailVisible]=useState(false)
  const [imgVisible,setImgVisible]=useState(false)
  const [[singleArticle],getArticle]=useFetch(getSingleArticle(id))
  useIntersectionObserver<HTMLDivElement>({
  target: ref, callback: ([{ isIntersecting }]: any, observerElement: { unobserve: (arg0: HTMLDivElement | null) => void; }) => {
    if (isIntersecting) {
      setImgVisible(true);
      observerElement.unobserve(ref.current);
    }
  },
  rootMargin: "0px",
  threshold: 0.1
})
useEffect(()=>{
  getArticle()
},[])
useEffect(()=>{
  console.log(singleArticle)
},[singleArticle])
  return (
    <div className="article-card-wrap">
      <div
        ref={ref}
        className="img-wrap"
      >
        {imgVisible&&<div className="img" 
        style={{
          backgroundImage: `url(${image})`,
        }}
        ></div>}
      </div>
      <div className="article-msg">
        <div className="article-title">{title}</div>
        <div className="author">作者：{author}</div>
        <div className="date">发布于：{time}</div>
  
      </div>
     
      {/* {singleArticle?<ReactMarkdown children={singleArticle.data.content} ></ReactMarkdown>:<Loading></Loading>} */}
      <div className="operate">{!detailVisible?"详情":"收起"}</div>
    </div>
  );
}

export default React.memo(ArticleCard);
