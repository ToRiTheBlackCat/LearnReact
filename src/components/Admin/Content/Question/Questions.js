import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { GoPlusCircle } from "react-icons/go";
import { LuOctagonMinus } from "react-icons/lu";
import { TbSquareRoundedMinus } from "react-icons/tb";
import { PiPlusCircleFill } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";
import _, { iteratee } from "lodash";

const Questions = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "Question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "Answer 1.1",
          isCorrect: true,
        },
      ],
    },
    {
      id: uuidv4(),
      description: "Question 2",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "Answer 2.1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handlerAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQues = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };

      setQuestions([...questions, newQues]);
    } else if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => item.id !== id);
      setQuestions(questionClone);
    }
  };

  const handlerAddRemoveAnswer = (type, ansId, quesId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAns = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = questionsClone.findIndex((item) => item.id === quesId);
      questionsClone[index].answers.push(newAns);

      setQuestions(questionsClone);
    } else if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === quesId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== ansId
      );

      setQuestions(questionsClone);
    }
  };

  return (
    <div className="questions-container">
      <div className="title">Manage Question</div>
      <hr />
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
      <div className="mt-3 mb-2">Add questions:</div>

      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="q-main mb-4">
              <div className="questions-content">
                <div className="form-floating description">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name@example.com"
                    value={question.description}
                  />
                  <label>Question {index + 1} 's description</label>
                </div>
                <div className="group-upload">
                  <label className="label-upload">Upload img</label>
                  <input type="file" hidden />
                  <span>No file is uploaded</span>
                </div>
                <div className="btn-ques">
                  <span onClick={() => handlerAddRemoveQuestion("ADD", "")}>
                    <GoPlusCircle className="icon-add-ques" />
                  </span>
                  {questions.length > 1 && (
                    <span
                      onClick={() =>
                        handlerAddRemoveQuestion("REMOVE", question.id)
                      }
                    >
                      <LuOctagonMinus className="icon-remove-ques" />
                    </span>
                  )}
                </div>
              </div>

              {question.answers &&
                question.answers.length > 0 &&
                question.answers.map((answer, index) => {
                  return (
                    <div key={answer.id} className="answers-content">
                      <input
                        className="form-check-input iscorrect"
                        type="checkbox"
                        checked={answer.isCorrect}
                      />
                      <div className="form-floating answer-name">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name@example.com"
                          value={answer.description}
                        />
                        <label>Answer {index + 1}</label>
                      </div>
                      <div className="btn-ans">
                        <span
                          onClick={() =>
                            handlerAddRemoveAnswer("ADD", "", question.id)
                          }
                        >
                          <PiPlusCircleFill className="icon-add-ans" />
                        </span>
                        {question.answers.length > 1 && (
                          <span
                            onClick={() =>
                              handlerAddRemoveAnswer(
                                "REMOVE",
                                answer.id,
                                question.id
                              )
                            }
                          >
                            <TbSquareRoundedMinus className="icon-remove-ans" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

              <hr />
            </div>
          );
        })}
    </div>
  );
};
export default Questions;
