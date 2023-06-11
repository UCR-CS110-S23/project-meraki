import react from "react";
import { io } from "socket.io-client";
import { Emojione } from 'react-emoji-render';

const EMOJIS = ["💖", "🤡", "👀", "😳", "👍", "👎","💀", "🔥"];

class Chatroom extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      messages: [],
      reactions: [],
      searchText: "",
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

    this.setState({
      text: "",
      searchText: "", // Clear the search text
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

  handleReaction = (messageId, emoji) => {
    this.setState((prevState) => {
      const { messages } = prevState;
      const updatedMessages = messages.map((message) => {
        if (message._id === messageId) {
          const updatedReactions = message.reactions ? [...message.reactions] : [];
          const reactionIndex = updatedReactions.findIndex((reaction) => reaction.emoji === emoji);
    
          if (reactionIndex !== -1) {
            updatedReactions[reactionIndex].count++;
          } else {
            updatedReactions.push({ emoji, count: 1 });
          }
    
          return {
            ...message,
            reactions: updatedReactions,
          };
        }
    
        return message;
      });
    
      return {
        messages: updatedMessages,
      };
    });
  };
  
  removeReaction = (messageId, emoji) => {
    this.setState((prevState) => {
      const { messages } = prevState;
      const updatedMessages = messages.map((message) => {
        if (message._id === messageId && message.reactions) {
          const updatedReactions = message.reactions.map((reaction) => {
            if (reaction.emoji === emoji) {
              const updatedReaction = { ...reaction };
              updatedReaction.count--;
    
              if (updatedReaction.count === 0) {
                return null; // Remove the reaction
              }
    
              return updatedReaction;
            }
    
            return reaction;
          }).filter(Boolean); // Filter out null reactions
    
          return {
            ...message,
            reactions: updatedReactions,
          };
        }
    
        return message;
      });
    
      return {
        messages: updatedMessages,
      };
    });
  };
 
  
render() {
  const { messages, searchText } = this.state;

  // Filter messages based on search text
  const filteredMessages = messages.filter((message) =>
    message.message.text.toLowerCase().includes(searchText.toLowerCase())
  );

    return (
      <div>
        <h2>Chatroom: {this.props.roomName}</h2>
        <h3>User: {this.props.userName}</h3>

        <input
          type="text"
          value={searchText}
          onChange={(e) => this.setState({ searchText: e.target.value })}
          placeholder="Search messages"
        />

        <ul>
          {filteredMessages.map((message) => (
            <li key={message._id}>
              <p>
                <b>{message.owner}:</b> {message.message.text}
              </p>
              <div>
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => this.handleReaction(message._id, emoji)}
                  >
                    <Emojione text={emoji} />
                    {message.reactions
                      ?.find((reaction) => reaction.emoji === emoji)
                      ?.count}
                  </button>
                ))}
                {message.reactions?.map(({ emoji, count }) => (
                  <span key={emoji}>
                    <Emojione text={emoji} />
                    {count}
                    <button
                      onClick={() => this.removeReaction(message._id, emoji)}
                    >
                      Remove
                    </button>
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <input
          type="text"
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <button onClick={() => this.sendChat(this.state.text)}>send</button>
        <button onClick={() => this.goBack()}>Return to Lobby</button>
        <button onClick={this.leaveRoom}>Delete room</button>
      </div>
    );
  }
}

export default Chatroom;