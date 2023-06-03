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

  addNewRoom = (data) => {
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
        console.log(data, "room data (Lobby.js)"); //can delete this later (just printing out the room document the user inputs)
      })
    );
  };

  render() {
    return (
      <div>
        <h1>Lobby</h1>
        {this.state.rooms
          ? this.state.rooms.map((room) => {
              return (
                <Button
                  variant="contained"
                  key={"roomKey" + room.name}
                  onClick={() => alert(room.name)}
                >
                  {room.name}
                </Button>
              );
            })
          : "loading..."}
        {/* write codes to join a new room using room id*/}
        {/* write codes to enable user to create a new room*/}

        <Form
          fields={["Room name"]}
          type="Create a room"
          closeButton={false}
          submit={this.addNewRoom}
        />
      </div>
    );
  }
}

export default Lobby;
