import React, { useState } from "react";
import "./DisplayInfo.scss";

//statesless : component ko co state  != statefull
//CLASS COMPONENT
// class DisplayInfo extends React.Component {
//   //babel compiler

//   render() {
//     const { listUser } = this.props;
//     console.table(listUser);

//     return (
//       //prop - properties

//       <div className="display-infor-container">
//         {true && (
//           <div>
//             {listUser.map((user, index) => {
//               //Convert String to Number - Add +user.age in front of the variable
//               return (
//                 <div key={user.id} className={user.age > 18 ? "green" : "red"}>
//                   <div>
//                     <div>My name is: {user.name}</div>
//                     <div>My age is: {user.age}</div>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => this.props.handleDeleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

//FUNCTION COMPONENT when still not have HOOK
const DisplayInfo = (props) => {
  const { listUser } = props;
  const [isShowHideListUser, setShowHideListUser] = useState(true);

  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };
  return (
    //prop - properties

    <div className="display-infor-container">
      <div>
        <span onClick={() => handleShowHideListUser()}>Show list user</span>
      </div>

      {isShowHideListUser && (
        <div>
          {listUser.map((user, index) => {
            //Convert String to Number - Add +user.age in front of the variable
            return (
              <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                <div>
                  <div>My name is: {user.name}</div>
                  <div>My age is: {user.age}</div>
                </div>
                <div>
                  <button onClick={() => props.handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayInfo;
