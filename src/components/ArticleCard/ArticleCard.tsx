import React from "react";
import "./ArticleCard.scss";
const imgUrl =
  "https://cdn.jsdelivr.net/gh/Anthem-whisper/imgbed/img/202112281328773.jpeg";
function ArticleCard() {
  return (
    <div className="article-card-wrap">
      <div
        className="img"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
      <div className="article-msg">
        <div className="article-title">SCTF2021 Writeup by X1cT34m</div>
        <div className="author">作者：admin</div>
        <div className="date">发布于：2022-03-27</div>
      </div>
    </div>
  );
}

export default ArticleCard;
