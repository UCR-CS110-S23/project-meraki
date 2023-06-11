import react from "react";
import { Button, TextField } from "@mui/material";

class EditMessageForm extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <form
        onSubmit={(event) =>
          this.props.editMessage(event, this.props.message_Id, this.state.text)
        }
      >
        <label htmlFor="editMsg">Edit Message: </label>
        <input
          type="text"
          id="editMsg"
          name="editMsg"
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <input type="submit" value="save"></input>
      </form>
    );
  }
}

export default EditMessageForm;
