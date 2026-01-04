import "./ManageUser.scss";
import { MdPlusOne } from "react-icons/md";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUsersWithPaginate,
} from "../../../services/apiServices";
import ModalCreateUser from "./ModalCreateUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 9;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setshowModalUpdateUser] = useState(false);
  const [showModalViewUser, setshowModalViewUser] = useState(false);
  const [showModalDeleteUser, setshowModalDeleteUser] = useState(false);

  const [dataDetail, setdataDetail] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  const [listUsers, setListUsers] = useState([]);
  //ComponentDidMount
  //Not recommended to use async directly in useEffect
  useEffect(() => {
    // fetchListUser();
    fetchListUserWithPaginate(1, LIMIT_USER);
  }, []);

  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUserWithPaginate = async (page) => {
    let res = await getUsersWithPaginate(page, LIMIT_USER);
    if (res && res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setshowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const handleClickBtnView = (user) => {
    setshowModalViewUser(true);
    setdataDetail(user);
  };

  const handleClickBtnDelete = (user) => {
    setshowModalDeleteUser(true);
    setdataDetail(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const resetDetailData = () => {
    setdataDetail({});
  };

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
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUserWithPaginate={fetchListUserWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalViewUser
          show={showModalViewUser}
          setShow={setshowModalViewUser}
          dataDetail={dataDetail}
          resetDetailData={resetDetailData}
        />
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setshowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          resetUpdateData={resetUpdateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setshowModalDeleteUser}
          dataDetail={dataDetail}
          fetchListUserWithPaginate={fetchListUserWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
