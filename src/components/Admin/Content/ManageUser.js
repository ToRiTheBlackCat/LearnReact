import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { MdPlusOne } from "react-icons/md";
import { useState } from "react";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">ManageUser</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className=" btn btn-success"
            onClick={() => setShowModalCreateUser(true)}
          >
            <MdPlusOne /> Add new user
          </button>
        </div>
        <div className="table-users-container">User table</div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
