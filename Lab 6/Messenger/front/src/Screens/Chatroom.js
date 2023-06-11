import react from "react";
import { io } from "socket.io-client";

class Chatroom extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      messages: [],
      editedMessage: "",
    };
    this.socket = io("http://localhost:3001", {
      cors: {
        origin: "http://localhost:3001",
        credentials: true,
      },
      transports: ["websocket"],
    });
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
      let msgObj = {
        message: { text: message.msgText },
        owner: message.sender, //when we receive the emit on "chat message", we also get the data back that we sent from  `this.socket.emit("chat message"..)` in the sendChat() function
      }; //TODO: can add sender/user here to the object if we want to display the owner of the msg later
      this.setState({ messages: [...this.state.messages, msgObj] });
    });
  }

  sendChat = (text) => {
    this.socket.emit("chat message", {
      msgText: text,
      sender: this.props.userName, //when sending and receiving real-time messages, we want to retrieve the actual sender of the message and render the correct render of this message on the DOM
    });
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

  editMessage = (index) => {
    const messages = [...this.state.messages];
    this.setState({messages, editedMessage: messages[index].message.text});
    const msg = document.getElementById(index);
    let replaceMsg = this.props.userName;
    replaceMsg += ": ";
    let editBox = document.createElement("input");
    editBox.setAttribute("type", "text");
    editBox.setAttribute("id", "msgInput");
    editBox.setAttribute("onChange", "{(e) => {this.setState({text: e.target.value});}}");
    msg.innerHTML = replaceMsg;
    msg.appendChild(editBox);
  }

  saveEdit = (index) => {

  }

  goBack = () => {
    this.props.changeScreen("lobby", "");
  };

  leaveRoom = () => {
    fetch(this.props.server_url + "/api/rooms/leave", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Room name": this.props.roomName,
      }),
    }).then((res) =>
      res.json().then((data) => {
        alert(data.message);
        if (data.deleted) {
          this.props.changeScreen("lobby", "");
        }
      })
    );
  };

  render() {
    return (
      <div>
        <h2> Chatroom: {this.props.roomName}</h2>
        <h3>User: {this.props.userName}</h3>
        {/* show chats */}
        <ul>
          {this.state.messages.map((message, index) =>
            message.owner === this.props.userName ? (
              <li key={index} id={index}>
                {this.props.userName}: {message.message.text} {/*first */}
                <button onClick={() => this.editMessage(index)}>Edit</button>
              </li>
            ) : (
              <li key={index}>
                {message.owner}: {message.message.text} {/*second*/}
              </li>
            )
          )}
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
        <button onClick={this.leaveRoom}>Delete room</button>
      </div>
    );
  }
}

export default Chatroom;
