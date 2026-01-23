import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import _ from "lodash";
import "./ModalUpdateQuiz.scss";
import { MdDriveFolderUpload } from "react-icons/md";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState("");
  const [reviewImg, setReviewImg] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      let defaultType = options.find(
        (item) => item.value === dataUpdate.difficulty,
      );
      setType(defaultType);
      if (dataUpdate.image) {
        setReviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    //Reset data
    props.resetUpdateData(null);
  };

  const handleChangeFile = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log("upload file", file);
      const imgUrl = URL.createObjectURL(file);
      setReviewImg(imgUrl);
      setImage(file);
    }
  };

  const handleSubmitUpdateQuiz = () => {
    console.log(
      "Update data pass to API",
      dataUpdate.id,
      "-",
      name,
      "-",
      description,
      "-",
      type.value,
      "-",
      image,
    );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static" //để ko bị tắt khi click ra ngoài
        className="modal-update-quiz"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Type</label>
              <Select
                value={type}
                defaultValue={type}
                onChange={setType}
                options={options}
                placeholder="Quiz type"
              />
            </div>
            <div className="more-actions form-group">
              <label
                className="image-upload mb-1"
                htmlFor="imageUploadUpdate"
                // onChange={(event) => setImage(event.target.value)}
              >
                <MdDriveFolderUpload />
                Upload image
              </label>
              <input
                type="file"
                id="imageUploadUpdate"
                hidden
                className="form-control"
                onChange={(event) => handleChangeFile(event)}
              />
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
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateQuiz;
