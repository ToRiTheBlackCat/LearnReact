//class component
import React from "react";
import UserInfo from "./UserInfo.js";
import DisplayInfo from "./DisplayInfo.js";
class MyComponent extends React.Component {
  //JSX
  render() {
    const myAge = 21;
    const arr = ["a1,", "b2,", "c3"];
    return (
      <div>
        <UserInfo />
        <br />
        <br />
        <DisplayInfo name="Tri Dep Trai" age={myAge} myArr={arr} />
      </div>
    );
  }
}
export default MyComponent;
