import react from "react";
import Form from "../Components/form.js";
import { Button } from "@mui/material";

class Auth extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      selectedForm: undefined,
    };
  }

  closeForm = () => {
    this.setState({ showForm: false });
  };

  login = (data) => {
    // TODO: write codes to login
  };

  register = (data) => {
    // TODO: write codes to register
    fetch(this.props.server_url + "/api/auth/register", {
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
        console.log(data); //viewing the inputted user login info on browser's console
      })
    );
  };

  render() {
    let display = null;
    if (this.state.showForm) {
      let fields = [];
      if (this.state.selectedForm === "login") {
        fields = ["username", "password"];
        display = (
          <Form
            fields={fields}
            close={this.closeForm}
            type="login"
            submit={this.login}
            key={this.state.selectedForm}
          />
        );
      } else if (this.state.selectedForm === "register") {
        fields = ["username", "password", "name"];
        display = (
          <Form
            fields={fields}
            close={this.closeForm}
            type="register"
            submit={this.register}
            key={this.state.selectedForm}
          />
        );
      }
    } else {
      display = (
        <div>
          <Button
            onClick={() =>
              this.setState({ showForm: true, selectedForm: "login" })
            }
          >
            {" "}
            Login{" "}
          </Button>
          <Button
            onClick={() =>
              this.setState({ showForm: true, selectedForm: "register" })
            }
          >
            {" "}
            Register{" "}
          </Button>
        </div>
      );
    }
    return (
      <div>
        <h1> Welcome to our website! </h1>
        {display}
      </div>
    );
  }
}

export default Auth;
