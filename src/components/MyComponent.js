//class component
import React, { useState } from "react";
import AddUserInfo from "./AddUserInfo.js";
import DisplayInfo from "./DisplayInfo.js";
// class MyComponent extends React.Component {
//   //JSX
//   //DRY - Don't repeat yourself
//   state = {
//     listUser: [
//       { id: 1, name: "Minh Tri1", age: 16 },
//       { id: 2, name: "Minh Tri2", age: 88 },
//       { id: 3, name: "Minh Tri3", age: 55 },
//     ],
//   };
//   handleAddNewUser = (userObj) => {
//     console.log(userObj);
//     this.setState({
//       listUser: [userObj, ...this.state.listUser],
//     });
//   };
//   handleDeleteUser = (userId) => {
//     console.log(userId);
//     let listUsersClone = this.state.listUser;

//     listUsersClone = listUsersClone.filter((item) => item.id !== userId);
//     this.setState({
//       listUser: listUsersClone,
//     });
//   };
//   render() {
//     //React Fragment
//     // <React.Fragment></React.Fragment> or
//     // <> </>
//     return (
//       <>
//         <div className="a-container">
//           <AddUserInfo handleAddNewUser={this.handleAddNewUser} />
//         </div>
//         <br />
//         <div className="b-container">
//           <DisplayInfo
//             listUser={this.state.listUser}
//             handleDeleteUser={this.handleDeleteUser}
//           />
//         </div>
//       </>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUser, setListUser] = useState([
    { id: 1, name: "Minh Tri1", age: 16 },
    { id: 2, name: "Minh Tri2", age: 88 },
    { id: 3, name: "Minh Tri3", age: 55 },
  ]);

  const handleAddNewUser = (userObj) => {
    console.log(userObj);
    setListUser([userObj, ...listUser]);
  };
  const handleDeleteUser = (userId) => {
    console.log(userId);
    let listUsersClone = listUser;

    listUsersClone = listUsersClone.filter((item) => item.id !== userId);
    setListUser(listUsersClone);
  };

  return (
    <>
      <div className="a-container">
        <AddUserInfo handleAddNewUser={handleAddNewUser} />
      </div>
      <br />
      <div className="b-container">
        <DisplayInfo listUser={listUser} handleDeleteUser={handleDeleteUser} />
      </div>
    </>
  );
};
export default MyComponent;
