import { useState } from "react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="mainContainer">
      <div id="loginContainer">
        <h2>Log in</h2>
        <div id="inputs">
          <input
            className="input"
            id="nameInput"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value) || console.log(e.target.value)
            }
          ></input>
          <input
            className="input"
            id="postContent"
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value) || console.log(e.target.value)
            }
          ></input>
        </div>
        <div id="loginButtonContainer">
          <button id="loginButton">Log in</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
