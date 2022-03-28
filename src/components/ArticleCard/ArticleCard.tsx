import React,{useState,useRef} from "react";
import { useIntersectionObserver } from "../../utils/customHooks";
import "./ArticleCard.scss";
const imgUrl =
  "https://cdn.jsdelivr.net/gh/Anthem-whisper/imgbed/img/202112281328773.jpeg";
function ArticleCard() {
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
          backgroundImage: `url(${imgUrl})`,
        }}
        ></div>}
      </div>
      <div className="article-msg">
        <div className="article-title">SCTF2021 Writeup by X1cT34m</div>
        <div className="author">作者：admin</div>
        <div className="date">发布于：2022-03-27</div>
      </div>
    </div>
  );
}

export default React.memo(ArticleCard);
