//class component
import React from "react";
import AddUserInfo from "./AddUserInfo.js";
import DisplayInfo from "./DisplayInfo.js";
class MyComponent extends React.Component {
  //JSX
  //DRY - Don't repeat yourself
  state = {
    listUser: [
      { id: 1, name: "Minh Tri1", age: 16 },
      { id: 2, name: "Minh Tri2", age: 88 },
      { id: 3, name: "Minh Tri3", age: 55 },
    ],
  };
  handleAddNewUser = (userObj) => {
    console.log(userObj);
    this.setState({
      listUser: [userObj, ...this.state.listUser],
    });
  };
  render() {
    //React Fragment
    // <React.Fragment></React.Fragment> or
    // <> </>
    return (
      <>
        <div className="a-container">
          <AddUserInfo handleAddNewUser={this.handleAddNewUser} />
        </div>
        <br />
        <div className="b-container">
          <DisplayInfo listUser={this.state.listUser} />
        </div>
      </>
    );
  }
}
export default MyComponent;
