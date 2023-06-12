import react from "react";
import { Button } from "@mui/material";
import Form from "../Components/form.js";

class Lobby extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: undefined,
      roomName: "",
    };
  }

  componentDidMount() {
    // TODO: write codes to fetch all rooms from server
    fetch(this.props.server_url + "/api/rooms/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      //once we get the response from the POST request, we can process sent response's data from `res.status(200).json(dataSaved);`
      res.json().then((data) => {
        // console.log("FETCHING ALL ROOMS", data);
        this.setState({ rooms: data }); //viewing the inputted user login info on browser's console
      })
    );
  }

  createRoom = (data) => {
    fetch(this.props.server_url + "/api/rooms/create", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) =>
      //once we get the response from the POST request, we can process sent response's data from `res.status(200).json(dataSaved);`
      res.json().then((data) => {
        if (data.newRoom) {
          this.props.changeScreen("chatroom", data.room_name);
        } else {
          alert(data.message);
        }
        console.log(data, "room data (Lobby.js)"); //can delete this later (just printing out the room document the user inputs)
      })
    );
  };

  joinRoom = (data) => {
    fetch(this.props.server_url + "/api/rooms/join", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) =>
      //once we get the response from the POST request, we can process sent response's data from `res.status(200).json(dataSaved);`
      res.json().then((data) => {
        if (data.exist) {
          this.props.changeScreen("chatroom", data.room_name);
        } else {
          alert(`Room ${data.room_name} does not exist!`);
        }
        // alert(data.message);
        console.log(data, "join room data (Lobby.js)"); //can delete this later (just printing out the room document the user inputs)
      })
    );
  };

  openChatroom = (roomName) => {
    //check if the selected room to open exists anymore
    fetch(this.props.server_url + `/api/rooms/${roomName}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        if (!data.deleted) {
          this.props.changeScreen("chatroom", roomName);
        } else {
          alert(data.message);
          // this.forceUpdate();
        }
        // this.props.changeScreen("auth", "");
      });
    });

    console.log(roomName, "openroom");
  };

  logout = (data) => {
    fetch(this.props.server_url + "/api/auth/logout", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json().then((data) => {
        this.props.changeScreen("auth", "");
      });
    });
  };

  openProfile = (data) => {
    this.props.changeScreen("profile", "");
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1>{this.props.userName}'s Lobby</h1>
        <h3>Available Rooms:</h3>{this.state.rooms
          ? this.state.rooms.map((room) => {
              return (
                <Button
                  variant="contained"
                  key={"roomKey" + room.name}
                  onClick={() => this.openChatroom(room.name)}
                >
                  {room.name}
                </Button>
              );
            })
          : "loading..."}
          
        {/* write codes to enable user to create a new room*/}
        <br></br><br></br><br></br><br></br>
        
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{ marginRight: "20px", border: "1px solid black", padding: "10px" }}>
          <Form
            fields={["Room name"]}
            type="Create a room"
            closeButton={false}
            submit={this.createRoom}
            
          />
        </div>
        <div style={{ marginRight: "20px", border: "1px solid black", padding: "10px"}}>
          <Form
            fields={["Room name"]}
            type="Join a room"
            closeButton={false}
            submit={this.joinRoom}
          />
        </div>
      </div>

      <div style={{ position: "absolute", top: 15, right: 60, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => this.openProfile()}>Edit Profile</Button>
        <Button onClick={() => this.logout()}>Logout</Button>
      </div>
      </div>
    );
  }
}

export default Lobby;
