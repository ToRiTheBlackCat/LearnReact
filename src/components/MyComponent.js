//class component
import React from "react";
import UserInfo from "./UserInfo.js";
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
  render() {
    return (
      <div>
        <UserInfo />
        <br />
        <DisplayInfo listUser={this.state.listUser} />
      </div>
    );
  }
}
export default MyComponent;
