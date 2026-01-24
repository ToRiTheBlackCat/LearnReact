import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { GoPlusCircle } from "react-icons/go";
import { LuOctagonMinus } from "react-icons/lu";
import { TbSquareRoundedMinus } from "react-icons/tb";
import { PiPlusCircleFill } from "react-icons/pi";
const Questions = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="questions-container">
      <div className="title">Manage Question</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz</label>
          <Select
            value={selectedQuiz}
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
            placeholder="Choose a Quiz"
          />
        </div>
      </div>
      <div className="mt-3">Add questions:</div>
      <div>
        <div className="questions-content">
          <div className="form-floating description">
            <input
              type="text"
              className="form-control"
              placeholder="name@example.com"
            />
            <label>Description</label>
          </div>
          <div className="group-upload">
            <label className="label-upload">Upload img</label>
            <input type="file" hidden />
            <span>No file is uploaded</span>
          </div>
          <div className="btn-ques">
            <span>
              <GoPlusCircle className="icon-add-ques" />
            </span>
            <span>
              <LuOctagonMinus className="icon-remove-ques" />
            </span>
          </div>
        </div>
        <div className="answers-content">
          <input className="form-check-input iscorrect" type="checkbox" />
          <div className="form-floating answer-name">
            <input
              type="text"
              className="form-control"
              placeholder="name@example.com"
            />
            <label>Answer 1</label>
          </div>
          <div className="btn-ans">
            <span>
              <PiPlusCircleFill className="icon-add-ans" />
            </span>
            <span>
              <TbSquareRoundedMinus className="icon-remove-ans" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Questions;
