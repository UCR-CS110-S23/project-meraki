import './Favorites.css';

function Favorites() {
  return (
    <div>
      <div id="favoritesContent">
        <h1 id="mainFavoritesText">Favorites</h1>
        <div id="searchBarBackground">
          <div id="search">
            <input id="searchBar" type="search" placeholder="Search Bar" size="50" />
          </div>
        </div>

        <div id="favoritesBox">
          <div id="favoritesText">
            <h3>Favorites</h3>
          </div>

          <div id="favoritesPosts">
            <div className="favoritesPost"></div>
            <div className="favoritesPost"></div>
            <div className="favoritesPost"></div>
            <div className="favoritesPost"></div>
            <div className="favoritesPost"></div>
            <div className="favoritesPost"></div>
            <div className="favoritesPost"></div>
            <div className="favoritesPost"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
