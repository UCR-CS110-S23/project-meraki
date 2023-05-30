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

      <div id="recipes" class="f">
        <h3 class="title">Recipes</h3>
        <div class="fpost">1</div>
        <div class="fpost">2</div>
        <div class="fpost">3</div>
        <div class="fpost">4</div>        
        <div class="fpost">5</div>
        <div class="fpost">6</div>
        <div class="fpost">7</div>
        <div class="fpost">8</div>
      </div>

    </div>
  );
}

export default Food;
