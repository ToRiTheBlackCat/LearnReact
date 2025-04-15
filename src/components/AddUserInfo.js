import React from "react";

class AddUserInfo extends React.Component {
  state = {
    name: "",
    address: "HCM city",
    age: "",
  };

  handleOnChangeInput = (event) => {
    //Bad code
    //this.state.name = event.target.value;
    this.setState({
      name: event.target.value,
    });
  };
  handleOnChangeAge = (event) => {
    //Bad code
    //this.state.name = event.target.value;
    this.setState({
      age: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "random",
      name: this.state.name,
      age: this.state.age,
    });
  };

  render() {
    return (
      <div>
        My name is: {this.state.name} and I'm {this.state.age}
        <br />
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <label>Your age: </label>
          <input
            value={this.state.age}
            onChange={(event) => this.handleOnChangeAge(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default AddUserInfo;
