import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const apiKey = '3286748b21ae414e816d09276848b6d2' // Use API key passed as prop
    // const url=`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const parsedData = await response.json();
      props.setProgress(70);
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch news data:', error);
      setLoading(false);
    }
    props.setProgress(100);
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_NEWS_API);
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, [page]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const apiKey = '3286748b21ae414e816d09276848b6d2'; // Use API key passed as prop
        // const url=`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    setPage(nextPage);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const parsedData = await response.json();
      setArticles(articles.concat(parsedData.articles || []));
    } catch (error) {
      console.error('Failed to fetch more news data:', error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || 'No Title'}
                  description={element.description || 'No Description'}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author || 'Unknown'}
                  date={element.publishedAt || 'Unknown Date'}
                  source={element.source.name || 'Unknown Source'}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 5,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
