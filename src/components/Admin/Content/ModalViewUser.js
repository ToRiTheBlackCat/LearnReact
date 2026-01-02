import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDriveFolderUpload } from "react-icons/md";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { putUpdateUsers } from "../../../services/apiServices";
import _ from "lodash";

const ModalViewUser = (props) => {
  const { show, setShow, dataDetail } = props;

  const handleClose = () => {
    setShow(false);

    setEmail("");
    setPassword("");
    setUserName("");
    setRole("USER");
    setImage("");
    setReviewImg("");
    props.resetDetailData();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [reviewImg, setReviewImg] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataDetail)) {
      //If not empty - update
      setEmail(dataDetail.email);
      setUserName(dataDetail.username);
      setRole(dataDetail.role);
      if (dataDetail.image) {
        setReviewImg(`data:image/jpeg;base64,${dataDetail.image}`);
      }
    }
  }, [dataDetail]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static" //để ko bị tắt khi click ra ngoài
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail of User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">UserName</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                disabled
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select className="form-select" value={role} disabled>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="col-md-12">
              <label
                className="label-upload"
                htmlFor="labelUpload"
                // onChange={(event) => setImage(event.target.value)}
              >
                <MdDriveFolderUpload />
                Upload File Image
              </label>
              <input type="file" id="labelUpload" hidden disabled />
            </div>

            <div className="col-md-12 img-preview">
              <img
                src={reviewImg ? reviewImg : <span>Preview image</span>}
                alt="preview image"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
