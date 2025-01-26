import React, { useState } from "react";
import "./Post.css"; // Custom styles for post page

const Post = () => {
  const [tweetContent, setTweetContent] = useState(""); // Track tweet content
  const [tweets, setTweets] = useState([]); // Store submitted tweets

  // Handle content change in tweet textbox
  const handleTweetChange = (e) => {
    setTweetContent(e.target.value);
  };

  // Handle tweet submission
  const handleTweetSubmit = (e) => {
    e.preventDefault();
    if (tweetContent.trim() !== "") {
      // Save the tweet
      setTweets([...tweets, { content: tweetContent, user: "User1", time: new Date().toLocaleString() }]);
      setTweetContent(""); // Clear content after posting
    } else {
      alert("Please write something before posting.");
    }
  };

  return (
    <div className="post-container">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="main-content">
        {/* Post Section */}
        <div className="post-form-container">
          <h2 className="post-heading">What's happening?</h2>
          <form onSubmit={handleTweetSubmit} className="tweet-form">
            <textarea
              value={tweetContent}
              onChange={handleTweetChange}
              placeholder="Share your thoughts..."
              rows="5"
              maxLength="280"
              className="tweet-textbox"
            />
            <div className="form-footer">
              <span className="char-count">{280 - tweetContent.length} characters remaining</span>
              <button type="submit" className="tweet-btn">Post</button>
            </div>
          </form>
        </div>

        {/* Display Submitted Tweets */}
        <div className="tweet-feed">
          <h3 className="tweets-heading">Your Tweets</h3>
          {tweets.length > 0 ? (
            <div className="tweets">
              {tweets.map((tweet, index) => (
                <div key={index} className="tweet-card">
                  <p>{tweet.content}</p>
                  <small className="tweet-meta">Posted by {tweet.user} on {tweet.time}</small>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-tweets">
              <p>No tweets yet. Start sharing your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
