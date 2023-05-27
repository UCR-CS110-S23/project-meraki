import './Food.css'

function Food() {
  return (
    <div>
      <h1>Food</h1>

      <div id = "searchBarBackground">
        <div id = "search">
          <input id="searchBar" type="search" placeholder="Search Bar" size = "50"/>
        </div>
      </div>

      <div id = "recipes">
        <h3>Recipes</h3>

        <div id ="fpost1"></div>
        <div id="fpost2"></div>
        <div id="fpost3"></div>
        <div id="fpost4"></div>
        <div id="fpost5"></div>
        <div id="fpost6"></div>
        <div id="fpost7"></div>
        <div id="fpost8"></div>
      </div>


    </div>
  );
}

export default Food;
