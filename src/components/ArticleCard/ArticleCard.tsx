
import React,{useState,useRef} from "react";
import { useIntersectionObserver } from "../../utils/customHooks";
import { articlrCard } from "../../utils/interfaces";
import "./ArticleCard.scss";
function ArticleCard(props:articlrCard) {
  const {id,time,image,title,author}=props
  const ref=useRef<HTMLDivElement>(null)
  const [imgVisible,setImgVisible]=useState(false)
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
      <a target={"_blank"} href={`/passage?id=${id}`} className="operate">详情</a>
    </div>
  );
}

export default React.memo(ArticleCard);
