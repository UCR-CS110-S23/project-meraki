import react from "react";
import { io } from "socket.io-client";
import ProfilePicture from "../../Components/ProfilePicture/profilePicture";
import "./Chatroom.css";
import { Button } from "@mui/material";

class Chatroom extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      messages: [],
      searchText: "",
      editedMessage: "",
      oldText: "",
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
        id: message.message_id,
        likeCount: 0,
        dislikeCount: 0,
      }; //TODO: can add sender/user here to the object if we want to display the owner of the msg later
      this.setState({ messages: [...this.state.messages, msgObj] });
    });

    this.socket.on("likes", (data) => {
      //once it receives `io.to(room).emit("likes", ..)`'s message from the server, we want to update the state messages array with the updated likeCount so that it can be rendered on the frontend in real-time
      console.log("likeylikey", data);

      const updateLikesOnMessages = this.state.messages.map((message) => {
        //find the message to update
        if (data.msgId === message.id) {
          return { ...message, likeCount: data.likeCount }; //update the likeCount property of the message that has been reacted on
        } else {
          return message;
        }
      });
      this.setState({ messages: updateLikesOnMessages }); //we want to render the messages' like count
      //updateLikesOnMessages returns the updated messages array containing the updated like count of a specific message that has been reacted on
    });

    this.socket.on("dislikes", (data) => {
      console.log("dislikey", data);
      //Reference for updating an object in the messages array: https://bobbyhadz.com/blog/react-update-object-in-array
      const updateDislikesOnMessages = this.state.messages.map((message) => {
        if (data.msgId === message.id) {
          return { ...message, dislikeCount: data.dislikeCount };
        } else {
          return message;
        }
      });
      // console.log("Updated likes on msgs", updateLikesOnMessages);
      this.setState({ messages: updateDislikesOnMessages }); //we want to render the messages' dislike count
    });
  }

  sendChat = (text) => {
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
        console.log(data.message_id, "sent message"); //can delete this later (just printing out the room document the user inputs)
        this.socket.emit("chat message", {
          msgText: text,
          sender: this.props.userName, //when sending and receiving real-time messages, we want to retrieve the actual sender of the message and render the correct render of this message on the DOM
          message_id: data.message_id,
        });
      })
    );
  };

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

  //Reference: ChatGPT for guidance on handling likes
  handleLike = (msg_id) => {
    console.log("msgid", msg_id);
    //we want to update likes in real-time (onClick of the like button on a specific message)
    this.socket.emit("likes", { message_id: msg_id }); //send "likes" message along with the id of the message
  };

  handleDislike = (msg_id) => {
    console.log("msgid", msg_id);
    this.socket.emit("dislikes", { message_id: msg_id });
  };

  render() {
    const { messages, searchText } = this.state;
    const filteredMessages = messages.filter((message) =>
      message.message.text.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <div align="center">
        <br></br>
        <h2>Chatroom: {this.props.roomName}</h2>
        <h3>User: {this.props.userName}</h3>

        {/* search bar */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", left: 0, right: 0, margin: "auto" }}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => this.setState({ searchText: e.target.value })}
            placeholder="Search messages"
          />
        </div>
        <ul style={{ margin: 0, padding: 0 }}>
          <br></br>
          {filteredMessages.map((message, index) =>
            message.owner === this.props.userName ? (
              <li key={message.id}>
                <div class="messageCardContainer" style={{ display: "flex", justifyContent: "center", alignItems: "center", left: 0, right: 0, margin: "auto" }}>
                  <div className="messageCard">
                      <div className="picName">
                        <ProfilePicture
                          server_url={this.props.server_url}
                          userName={this.props.userName}
                          page="chat"
                        ></ProfilePicture>
                        <span className="owner">{this.props.userName}</span>&nbsp;
                      </div>
                      {message.message.text} &nbsp;&nbsp;&nbsp;
                      {/*first */}{"   "}
                      <button onClick={() => this.handleLike(message.id)}>👍</button>
                      {"   "}{message.likeCount}{"   "}
                      <button onClick={() => this.handleDislike(message.id)}>👎</button>
                      {message.dislikeCount}
                    </div>
                </div>
              </li>
            ) : (
              <li key={message.id}>
                <div class="messageCardContainer" style={{ display: "flex", justifyContent: "center", alignItems: "center", left: 0, right: 0, margin: "auto" }}>
                  <div className="messageCard">
                      <div className="picName">
                        <ProfilePicture
                          server_url={this.props.server_url}
                          userName={message.owner}
                          page="chat"
                        ></ProfilePicture>
                        <span className="owner">{message.owner}</span>&nbsp;
                      </div>
                      {message.message.text} &nbsp;&nbsp;&nbsp;
                      {/*first */}{"   "}
                      <button onClick={() => this.handleLike(message.id)}>👍</button>
                      {"   "}{message.likeCount}{"   "}
                      <button onClick={() => this.handleDislike(message.id)}>👎</button>
                      {message.dislikeCount}
                    </div>
                </div>    
              </li>
            )
          )}
        </ul>
        <br></br>
        {/* show chat input box*/}
        <input
          type="text"
          id="msgInput"
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
          placeholder="Send message"
        />
        <button onClick={() => this.sendChat(this.state.text)}>Send</button>
        <br></br><br></br>
        <Button onClick={() => this.goBack()}>Return to Lobby</Button>
        <Button onClick={this.leaveRoom}>Delete room</Button>
      </div>
    );
  }
}

export default Chatroom;