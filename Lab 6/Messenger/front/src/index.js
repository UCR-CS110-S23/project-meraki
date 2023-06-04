import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

//Reference: https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
//removed <React.StrictMode> since it was rendering this.state.messages twice (which resulted in displaying the messages in Chatroom.js two times instead of one)
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
