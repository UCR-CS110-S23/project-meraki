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

    fetch(this.props.server_url + `/api/messages/${this.props.roomName}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      //once we get the response from the POST request, we can process sent response's data from `res.status(200).json(dataSaved);`
      res.json().then((data) => {
        console.log("all messages", data);

        this.setState({ messages: this.state.messages.concat(data) });
      })
    );

    this.socket.on("chat message", (message) => {
      let msgObj = { message: { text: message } }; //TODO: can add sender/user here to the object if we want to display the owner of the msg later
      this.setState({ messages: [...this.state.messages, msgObj] });
    });
  }

  sendChat = (text) => {
    this.socket.emit("chat message", text);
    console.log("OO", text);

    fetch(this.props.server_url + "/api/messages/send", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_msg: text,
        username: this.props.userName,
        room: this.props.roomName,
      }),
    }).then((res) =>
      //once we get the response from the POST request, we can process sent response's data from `res.status(200).json(dataSaved);`
      res.json().then((data) => {
        // alert(data.message);
        console.log(data.message, "sent message"); //can delete this later (just printing out the room document the user inputs)
      })
    );
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
            <li>{message.message.text}</li>
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
