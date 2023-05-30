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

      <div id="recommendedPosts" class="f">
        <h3 class="title">Recommended Posts</h3>
        <div class="rpost">1</div>
        <div class="rpost">2</div>
        <div class="rpost">3</div>
        <div class="rpost">4</div>        
        <div class="rpost">5</div>
        <div class="rpost">6</div>
      </div>
    
      <div id = "recommendedUsers" class="f">
        <h3 class="title">Recommended Users</h3>
        <div class="ruser">1</div>
        <div class="ruser">2</div>
        <div class="ruser">3</div>
        <div class="ruser">4</div>
        <div class="ruser">5</div>
        <div class="ruser">6</div>
      </div>

    </div>
  );
}

export default Home;










