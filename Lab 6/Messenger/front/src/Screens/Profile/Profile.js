import react from "react";
import { Button } from "@mui/material";
import "./Profile.css";
import Form from "../../Components/form.js";
import ProfilePicture from "../../Components/ProfilePicture/profilePicture.js";

class Profile extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
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
        alert(`Successfully changed the username to ${data.newUsername}`);
      })
    );
  };

  handleFileChange = (event) => {
    //when user selects a file from their local machine folder, we want to set the imageFile state to this file they selected
    this.setState({ imageFile: event.target.files[0] });
  };

  handlePicUpload = async (event) => {
    // once the user hits submit to update their profile picture, we want to make a POST req to server to update this user's pfp to the one they selected
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", this.state.imageFile); //append the file the user uploaded to FormData so that we can pass it into the body of the POST request

      await fetch(this.props.server_url + "/api/profile/uploadPicture", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: formData,
      });
      console.log("Profile picture uploaded successfully.");
      alert("Profile picture uploaded successfully.");
    } catch (error) {
      console.error("Encountered an error during profile picture upload.");
    }
  };

  render() {
    return (
      <div align="center">
        <Button onClick={() => this.props.changeScreen("lobby", "")}>
          {" "}
          Return to Lobby
        </Button>
        <h2>Update Profile</h2>
        <br></br>

        <div id="userInfoContainer">
          <ProfilePicture
            server_url={this.props.server_url}
            userName={this.props.userName}
            page="profile"
          ></ProfilePicture>
          <h2 id="username">{this.props.userName}</h2>
        </div>
        <br></br>
        <h3>Update Profile Photo</h3>
        <form onSubmit={this.handlePicUpload}>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={this.handleFileChange}
          />
          <button type="submit">Upload Photo</button>
        </form>
        <br></br>
        <Form
          fields={["New username"]}
          type="Edit username"
          closeButton={false}
          submit={this.editUsername}
        />

        <br></br>
      </div>
    );
  }
}

export default Profile;
