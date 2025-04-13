//class component
import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "TRI NGUYEN",
    address: "HCM city",
    age: 21,
  };

  handleClick(event) {
    console.log("Button clicked");
    console.log("My name is: " + this.state.name); // chỉ tới element tương tác

    //merge state -> react class: auto knowing which one is new and which one is old to update
    this.setState({
      name: "TRI123",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }

  handleOnMouseOver(event) {
    console.log(event);
  }
  //JSX
  render() {
    return (
      <div>
        My name is: {this.state.name} and I'm {this.state.age}
        <br />
        <button
          onClick={(event) => {
            this.handleClick(event);
          }}
        >
          Click me
        </button>
        <button onMouseOver={this.handleOnMouseOver}> Hover me</button>
      </div>
    );
  }
}
export default MyComponent;
