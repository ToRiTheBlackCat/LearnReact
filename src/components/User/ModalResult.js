import { set } from "nprogress";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  const handleShowAnswer = () => {
    console.log("check dataModalResult: ", dataModalResult);
    props.setIsShowAnswer(true);
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        {/* để ko bị tắt khi click ra ngoài */}
        <Modal.Header closeButton>
          <Modal.Title>Your Result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions:<b> {dataModalResult.countTotal} </b>
          </div>
          <div>
            Total Correct Answers:<b> {dataModalResult.countCorrect} </b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleShowAnswer()}>
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
