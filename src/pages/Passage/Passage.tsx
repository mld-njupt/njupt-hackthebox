import React, { useEffect } from 'react';
import ShowMarkdown from '../../components/ShowMarkdown/ShowMarkdown';
import Loading from '../../components/Loading/Loading';
import { useFetch } from '../../utils/customHooks';
import { getSingleArticle } from '../../api/passage';
import getUrlParams from '../../utils/getUrlParams';
function Passage() {
  const [[singleArticle],getArticle]=useFetch(getSingleArticle(getUrlParams("id")))
  useEffect(()=>{
    getArticle()
  },[])
  
  return (
    <div>
     {singleArticle?<ShowMarkdown passage={singleArticle.data.content}></ShowMarkdown>:<Loading></Loading>}
    </div>
  );
}

export default Passage;
