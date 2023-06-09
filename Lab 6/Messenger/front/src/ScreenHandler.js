import react from "react";
import Auth from "./Screens/Auth.js";
import Lobby from "./Screens/Lobby.js";
import Chatroom from "./Screens/Chatroom.js";
import Profile from "./Screens/Profile.js";

const server_url = "http://localhost:3001";

class ScreenHandler extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: undefined,
      user_name: "",
      room_name: "",
    };
  }

  componentDidMount() {
    // checking if the user has active session
    // if yes, then show lobby. if no, then show auth
    fetch(server_url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        if (data.message == "logged in") {
          console.log("logged in!!!", data.username);
          this.setState({ screen: "lobby", user_name: data.username }); //need to also set user_name for if we refresh the page
        } else {
          this.setState({ screen: "auth" });
          console.log("AUTH", this.state.user_name);
        }
      });
    });
  }

  changeScreen = (screen, roomName) => {
    this.setState({ screen: screen });
    if (screen == "chatroom") {
      console.log(roomName, "CURRENT ROOM");
      this.setState({ room_name: roomName });
    }
  };

  setUsername = (name) => {
    this.setState({ user_name: name });
  };

  render() {
    let display = "loading...";
    if (this.state.screen == "auth") {
      display = (
        <Auth
          server_url={server_url}
          changeScreen={this.changeScreen}
          setUsername={this.setUsername}
        />
      );
    } else if (this.state.screen == "lobby") {
      display = (
        <Lobby
          server_url={server_url}
          changeScreen={this.changeScreen}
          userName={this.state.user_name}
        />
      );
    } else if (this.state.screen == "chatroom") {
      display = (
        <Chatroom
          server_url={server_url}
          roomName={this.state.room_name}
          userName={this.state.user_name}
          changeScreen={this.changeScreen}
        />
      );
    } else if (this.state.screen === "profile") {
      display = (
        <Profile
          server_url={server_url}
          roomName={this.state.room_name}
          userName={this.state.user_name}
          changeScreen={this.changeScreen}
          setUsername={this.setUsername}
        />
      );
    }
    return <div>{display}</div>;
  }
}

export default ScreenHandler;
