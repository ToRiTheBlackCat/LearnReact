import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import UserProfile from "./UserProfile";
import UserPassword from "./UserPassword.js";
import UserQuizHistory from "./UserQuizHistory.js";
import "./Profile.scss";

import PerfectScrollbar from "react-perfect-scrollbar";
const Profile = (props) => {
  const { show, setShow } = props;
  const [username, setUsername] = useState("EASY");
  const [image, setImage] = useState("");
  const [reviewImg, setReviewImg] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        className="modal-update-quiz"
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
              >
                Change Profile
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="password-tab"
                data-bs-toggle="tab"
                data-bs-target="#password"
                type="button"
                role="tab"
                aria-controls="password"
                aria-selected="false"
              >
                Change Password
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="history-tab"
                data-bs-toggle="tab"
                data-bs-target="#history"
                type="button"
                role="tab"
                aria-controls="history"
                aria-selected="false"
              >
                Quizzes History
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <UserProfile />
            </div>
            <div
              className="tab-pane fade"
              id="password"
              role="tabpanel"
              aria-labelledby="password-tab"
            >
              <UserPassword />
            </div>
            <div
              className="tab-pane fade"
              id="history"
              role="tabpanel"
              aria-labelledby="history-tab"
            >
              <UserQuizHistory />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
