import React, { useEffect, useState } from "react";
import axios from '../../config/axios';
import './news.styles.css'

const NewsPage = () => {
const [newsData, setNewsData] = useState()
  useEffect(() => {
    const getNews = async () => {
      try{
        const res = await axios.get('/news')
        setNewsData(res.data.articles)
      }catch(err){
        console.error(err)
      }
    }
    getNews()
  }, [])
  return (
    <div className='news-page'>
        <div className="title">
          <h1>TOP STORIES</h1>
          <h1>TOP STORIES</h1>
        </div>
        <div className="news-article-section">
            {
                newsData?.map((article) => (
                    <div className="news-box">
                        <img className="img-thumbnail" src={article.urlToImage} alt="" />
                        <h4>{article.title}</h4>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default NewsPage