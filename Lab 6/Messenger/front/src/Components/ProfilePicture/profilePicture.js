import react from "react";
import "./profilePicture.css";

class ProfilePicture extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
    };
  }

  componentDidMount() {
    fetch(
      this.props.server_url + `/api/profile/${this.props.userName}/picture`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) =>
      res.json().then((data) => {
        //REFERENCE: ChatGPT to help figure out the conversion between Array Buffer to an actual image that can be displayed on the frontend
        console.log("FETCHING PICTURE", data.data.data); //data.data.data is the array buffer
        //blob object represents raw data and is used to process this data
        const blob = new Blob([new Uint8Array(data.data.data)], {
          type: "image/jpeg",
        }); //make a new blob object; takes in buffer array data and wraps it in Uint8Array; type represents the type of content (i.e. jpeg image)
        const url = URL.createObjectURL(blob); //generates a url that represents the blob object containing image data
        this.setState({ imageUrl: url }); //set imageURL to the url representing the image data
      })
    );
  }

  render() {
    return (
      <div>
        <img
          class="profilePicture"
          src={this.state.imageUrl}
          alt="profile img"
        ></img>
      </div>
    );
  }
}

export default ProfilePicture;
