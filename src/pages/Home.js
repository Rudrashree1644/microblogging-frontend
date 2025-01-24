import React, { useState } from "react";
import "./Home.css"; // Custom styles

const Home = () => {
  const [postContent, setPostContent] = useState(""); // Track content in textbox
  const [userPosts, setUserPosts] = useState([]); // Store posts for the feed

  // Handle changes in post content
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  // Handle post submission (this will connect to backend in the future)
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== "") {
      setUserPosts([...userPosts, { content: postContent, user: "User1" }]); // Placeholder user
      setPostContent(""); // Clear textbox after posting
    } else {
      alert("Please write something before posting.");
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/search">Search</a></li>
          <li><a href="/post">Post</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Post Section */}
        <div className="post-section">
          <h2 className="post-title">What's happening?</h2>
          <form onSubmit={handlePostSubmit} className="post-form">
            <textarea
              value={postContent}
              onChange={handlePostChange}
              placeholder="Write something..."
              rows="4"
              className="post-textbox"
            />
            <button type="submit" className="post-btn">Post</button>
          </form>
        </div>

        {/* Feed Section */}
        <div className="feed-section">
          <h2 className="feed-title">Feed</h2>
          <div className="feed">
            {userPosts.length > 0 ? (
              userPosts.map((post, index) => (
                <div key={index} className="feed-post">
                  <p>{post.content}</p>
                  <small>Posted by {post.user}</small>
                </div>
              ))
            ) : (
              <p>No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
