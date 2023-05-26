import { useState } from "react";
import "./UserForm.css";

function UserForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="mainContainer">
      <div id="formContainer">
        <h2>{props.formType}</h2>
        <div id="inputs">
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value) || console.log(e.target.value)
            }
          ></input>
          <input
            className="input"
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value) || console.log(e.target.value)
            }
          ></input>
        </div>
        <div id="buttonContainer">
          <button id="button">{props.formType}</button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
