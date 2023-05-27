// import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Food from "./pages/Food/Food";
import Arts from "./pages/Arts/Arts";
import HomeImprovements from "./pages/HomeImprovements/HomeImprovements";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/homeImprovements" element={<HomeImprovements />} />
          <Route path="/arts" element={<Arts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
