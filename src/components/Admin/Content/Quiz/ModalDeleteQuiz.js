import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiServices";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDetail } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuiz(dataDetail.id);

    //Show error or success toast message
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();

      await props.fetchQuiz();
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        {/* để ko bị tắt khi click ra ngoài */}
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz. Quiz name:{" "}
          <b>{dataDetail && dataDetail.name ? dataDetail.name : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
