import React from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";
class DisplayInfo extends React.Component {
  state = {
    isShow: true,
  };
  handleShowHideList = () => {
    this.setState({
      isShow: !this.state.isShow,
    });
  };

  render() {
    const { listUser } = this.props;
    console.table(listUser);

    return (
      //prop - properties\

      <div className="display-infor-container">
        <img src={logo} />
        <div>
          <span
            onClick={() => {
              this.handleShowHideList();
            }}
          >
            {this.state.isShow === true ? "Hide this list" : "Show this list"}
          </span>
        </div>
        {this.state.isShow && (
          <div>
            {listUser.map((user, index) => {
              //Convert String to Number - Add +user.age in front of the variable
              return (
                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                  <div>My name is: {user.name}</div>
                  <div>My age is: {user.age}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default DisplayInfo;
