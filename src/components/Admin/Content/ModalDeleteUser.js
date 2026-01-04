import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUsers } from "../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDetail } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUsers(dataDetail.id);

    //Show error or success toast message
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();

      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        {/* để ko bị tắt khi click ra ngoài */}
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this user. Email:{" "}
          <b>{dataDetail && dataDetail.email ? dataDetail.email : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
