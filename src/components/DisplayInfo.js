import React from "react";

class DisplayInfo extends React.Component {
  render() {
    const { age, name, myArr } = this.props;
    return (
      //prop - properties
      <div>
        <div>My name is {name}</div>
        <div>My age is {age}</div>
        <div>My array is {myArr}</div>
      </div>
    );
  }
}
export default DisplayInfo;
