// import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="navigationContainer">
          <div id="navigation">
            <Navigation />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
