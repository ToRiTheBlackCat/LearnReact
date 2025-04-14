import React from "react";

class UserInfo extends React.Component {
  state = {
    name: "TRI NGUYEN",
    address: "HCM city",
    age: 21,
  };

  handleOnChangeInput = (event) => {
    //Bad code
    //this.state.name = event.target.value;
    this.setState({
      name: event.target.value,
      age: event.target.value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    alert("Are you sure want to submit?");
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
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default UserInfo;
