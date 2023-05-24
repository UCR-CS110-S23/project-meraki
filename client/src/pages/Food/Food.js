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

        <div id ="posts">

        </div>
      </div>


    </div>
  );
}

export default Food;
