import react from "react";
import { io } from "socket.io-client";

class Chatroom extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      messages: [],
    };
    this.socket = io("http://localhost:3001");
  }

  componentDidMount() {
    this.socket.emit("join", {
      room: this.props.roomName,
      username: this.props.userName,
    });

    this.socket.on("chat message", (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  sendChat = (text) => {
    this.socket.emit("chat message", text);
  };

  goBack = () => {
    this.props.changeScreen("lobby", "");
  };

  render() {
    return (
      <div>
        <h2> Chatroom: {this.props.roomName}</h2>
        <h3>User: {this.props.userName}</h3>
        {/* show chats */}
        <ul>
          {this.state.messages.map((message) => (
            <li>{message}</li>
          ))}
        </ul>
        {/* show chat input box*/}
        <input
          type="text"
          id="msgInput"
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
        />
        <button onClick={() => this.sendChat(this.state.text)}>send</button>
        <button onClick={() => this.goBack()}>Return to Lobby</button>
      </div>
    );
  }
}

export default Chatroom;
