import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">ManageUser</div>
      <div className="users-content">
        <div>
          <button> Add new user</button>
        </div>
        <div>User table</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
