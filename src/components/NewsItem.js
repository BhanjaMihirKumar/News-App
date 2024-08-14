import React from 'react';

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <img src={imageUrl || "https://th.bing.com/th/id/R.177c2aa34a39821464a08f108e577d3f?rik=E6on3EJVDGOmSg&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f4707746%2fimages%2fo-BREAKING-NEWS-facebook.jpg&ehk=aOZD%2b3ct2JGBC7gowQvtiafkD2%2fQugxJAKZDR7bzdJw%3d&risl=&pid=ImgRaw&r=0"} className="card-img-top" alt="News" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
