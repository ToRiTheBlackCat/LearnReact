import { useEffect, useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import { MdDriveFolderUpload } from "react-icons/md";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState("");
  const [listQuiz, setListQuiz] = useState([]);
  const [reviewImg, setReviewImg] = useState("");

  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    console.log("Res of API", res);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
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

  const handleSubmitQuiz = async (event) => {
    //Validate
    if (!name || !description) {
      toast.error("Name/Description are required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      //Reset data
      setName("");
      setDescription("");
      setImage(null);
      setReviewImg(null);

      //Call data
      await fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  const handleClickBtnEdit = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdate(quiz);
    console.log("Data update in Modal Update Quiz", quiz);
  };

  const handleClickBtnDelete = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataUpdate(quiz);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        {/* Nếu là 0 thì sẽ tự động mở khi load page */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="add-new-quiz">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add new Quiz</legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label className="floatingInput">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label className="floatingPassword">Description</label>
                </div>
                <div className="my-3">
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
                    htmlFor="imageUpload"
                    // onChange={(event) => setImage(event.target.value)}
                  >
                    <MdDriveFolderUpload />
                    Upload image
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
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
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <hr />

      <div className="list-detail">
        <TableQuiz
          listQuiz={listQuiz}
          fetchQuiz={fetchQuiz}
          handleClickBtnEdit={handleClickBtnEdit}
          handleClickBtnDelete={handleClickBtnDelete}
        />
      </div>
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
        resetUpdateData={resetUpdateData}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDetail={dataUpdate}
        fetchQuiz={fetchQuiz}
      />
    </div>
  );
};

export default ManageQuiz;
