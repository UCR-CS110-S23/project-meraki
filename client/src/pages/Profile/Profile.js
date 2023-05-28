import './Profile.css';

function Profile() {
  return (
    <div id="profileContent">
      <h1 id="mainProfileText">Profile</h1>
      <div id="searchBarBackground">
        <div id="search">
          <input id="searchBar" type="search" placeholder="Search Bar" size="50" />
        </div>
      </div>

      <div id="postsBox">
        <div id="profileText">
          <h3>Your Posts</h3>
        </div>
        
        <div id="profilePosts">
          <div className="profilePost"></div>
          <div className="profilePost"></div>
          <div className="profilePost"></div>
          <div className="profilePost"></div>
          <div className="profilePost"></div>
          <div className="profilePost"></div>
          <div className="profilePost"></div>
          <div className="profilePost"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
