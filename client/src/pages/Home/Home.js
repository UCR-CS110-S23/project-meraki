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

        <div id ="posts">

        </div>
      </div>
    
      <div id = "recommendedUsers">
        <h3>Recommended Users</h3>
        
        <div id="users">

        </div>
      </div>

    </div>
  );
}

export default Home;