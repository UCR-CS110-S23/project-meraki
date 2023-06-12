import react from "react";
import { Button } from "@mui/material";
import Form from "../Components/form.js";

class Profile extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  editUsername = (data) => {
    fetch(this.props.server_url + "/api/profile/editUser", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        newName: data["New username"],
        oldName: this.props.userName,
      }),
    }).then((res) =>
      //once we get the response from the POST request, we can process sent response's data from `res.status(200).json(dataSaved);`
      res.json().then((data) => {
        console.log("NEWWWWUSERR", data.newUsername);
        this.props.setUsername(data.newUsername);
      })
    );
  };

  render() {
    return (
      <div align="center">
        <h2>Update Profile</h2>
        <br></br>
        <Form
          fields={["New username"]}
          type="Edit username"
          closeButton={false}
          submit={this.editUsername}
        />

        <div style={{position: "absolute", top: 300, right:700}}>
          <Button onClick={() => this.props.changeScreen("lobby", "")}>
            {" "}
            Return to Lobby
          </Button>
        </div>
      </div>
    );
  }
}

export default Profile;
