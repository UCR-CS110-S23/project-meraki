import './Home.css';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div id = "searchBarBackground">
        <div id = "search">
          <input id="searchBar" type="search" placeholder="Search Bar" size = "50"/>
        </div>
      </div>

      <div id = "recommendedPosts">
        <h3>Recommended Posts</h3>
        <div id ="post1"></div>
        <div id="post2"></div>
        <div id="post3"></div>
        <div id="post4"></div>
        <div id="post5"></div>
        <div id="post6"></div>
      </div>
    
      <div id = "recommendedUsers">
        <h3>Recommended Users</h3>
        <div id="user1"></div>
        <div id="user2"></div>
        <div id="user3"></div>
        <div id="user4"></div>
        <div id="user5"></div>
        <div id="user6"></div>
      </div>

    </div>
  );
}

export default Home;
