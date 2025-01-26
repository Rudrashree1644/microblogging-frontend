import React, { useState } from "react";
import "./Home.css"; // Custom styles

const Home = () => {
  const [postContent, setPostContent] = useState(""); // Track content in textbox
  const [userPosts, setUserPosts] = useState([]); // Store posts for the feed

  // Handle changes in post content
  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  // Handle post submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== "") {
      setUserPosts([
        ...userPosts,
        { content: postContent, user: "User1", likes: 0, isLiked: false, postId: Date.now() }, // Add a 'likes' and 'isLiked' state, also unique postId
      ]);
      setPostContent(""); // Clear textbox after posting
    } else {
      alert("Please write something before posting.");
    }
  };

  // Handle like toggle
  const handleLike = (index) => {
    const updatedPosts = [...userPosts];
    updatedPosts[index].isLiked = !updatedPosts[index].isLiked;
    updatedPosts[index].likes = updatedPosts[index].isLiked ? updatedPosts[index].likes + 1 : updatedPosts[index].likes - 1;
    setUserPosts(updatedPosts);
  };

  // Handle sharing a post (copy the link to clipboard)
  const handleShare = (postId) => {
    const postLink = `${window.location.origin}/post/${postId}`; // Generate a link for the post
    navigator.clipboard.writeText(postLink).then(() => {
      alert("Post link copied to clipboard!");
    });
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="main-content" >
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
                <div key={post.postId} className="feed-post">
                  <p>{post.content}</p>
                  <small>Posted by {post.user}</small>
                  <div className="post-actions">
                    <button
                      className={`like-btn ${post.isLiked ? "liked" : ""}`}
                      onClick={() => handleLike(index)}
                    >
                      {post.isLiked ? "❤️ Liked" : "🤍 Like"} ({post.likes})
                    </button>
                    <button
                      className="share-btn"
                      onClick={() => handleShare(post.postId)}
                    >
                      🔗 Share
                    </button>
                  </div>
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
