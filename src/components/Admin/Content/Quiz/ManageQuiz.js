import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0])
      setImage(event.target.files[0]);
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
      setName("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <div className="title">
        Manage Quizzes
        <hr />
      </div>
      <div className="add-new">
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
            <label for="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Your quiz description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label for="floatingPassword">Description</label>
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
            <label className="mb-1">Upload image</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => handleChangeFile(event)}
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
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
