
import React, { useState, useEffect } from 'react'
import axios from '../../config/axios';
import './News.style.css'

const News = () => {
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
  const top5Article = newsData?.slice(3, 10)
  return (
    <div className='news-container'>
      <div className='top-news news-content'>
        <h2>News</h2>
        {
          top5Article?.slice(1, 2).map((article) => (
            <a href={article.url}>
              <div>
                <h4>{article.title}</h4>
                <p>{article.source.name} &#8594;</p>
              </div>
            </a>
          ))
        }
      </div>
      <div className="top5 news-content">
        {
          top5Article?.map((article) => (
            <a href={article.url}>
              <div className="news-main">
                <h4>{article.title} </h4>
                <p>{article.source.name} &#8594;</p>
              </div>
            </a>
          ))
        }
        <p>Read More	&#8594;</p>
      </div>
    </div>
  )
}

export default News