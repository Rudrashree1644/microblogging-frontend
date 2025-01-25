import React, { useState } from "react";
import "./Profile.css"; // Importing the CSS file

const Profile = () => {
  const [username, setUsername] = useState("User1");
  const [editMode, setEditMode] = useState(false);
  const [followers, setFollowers] = useState(120);
  const [following, setFollowing] = useState(180);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [userPosts, setUserPosts] = useState([
    { content: "Loving the new profile!", user: "User1", time: new Date().toLocaleString() },
    { content: "Had a great day today!", user: "User1", time: new Date().toLocaleString() },
  ]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const handleShowFollowers = () => {
    setModalTitle("Followers");
    setShowModal(true);
  };

  const handleShowFollowing = () => {
    setModalTitle("Following");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle("");
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-pic"></div>
        <div className="profile-info">
          {editMode ? (
            <form onSubmit={handleUsernameSubmit} className="edit-form">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="profile-username-edit"
              />
              <button type="submit" className="save-button">Save</button>
            </form>
          ) : (
            <div className="username-section">
              <h2>{username}</h2>
              <button onClick={() => setEditMode(true)} className="edit-button">
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Stats */}
      <div className="profile-stats">
        <div className="profile-stat" onClick={handleShowFollowers}>
          <span>{followers}</span> Followers
        </div>
        <div className="profile-stat" onClick={handleShowFollowing}>
          <span>{following}</span> Following
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts-section">
        <h3 className="posts-title">Posts</h3>
        <div className="posts-list">
          {userPosts.map((post, index) => (
            <div key={index} className="post-card">
              <p>{post.content}</p>
              <small>
                Posted by {post.user} on {post.time}
              </small>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalTitle}</h2>
            <ul>
              {/* Empty list for now */}
              <p>No users to display yet.</p>
            </ul>
            <button onClick={handleCloseModal} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
