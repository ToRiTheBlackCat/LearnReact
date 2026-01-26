import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { GoPlusCircle } from "react-icons/go";
import { LuOctagonMinus } from "react-icons/lu";
import { TbSquareRoundedMinus } from "react-icons/tb";
import { PiPlusCircleFill } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";
import _, { every, toUpper } from "lodash";

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

  const handleOnChange = (type, quesId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);

      let index = questionsClone.findIndex((item) => item.id === quesId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnChangeFileQuestion = (quesId, event) => {
    let questionsClone = _.cloneDeep(questions);

    let index = questionsClone.findIndex((item) => item.id === quesId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;

      console.log(questionsClone);

      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, ansId, quesId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === quesId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === ansId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = () => {
    alert("Save clicked");
    console.log(questions);
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
                    onChange={(event) =>
                      handleOnChange(
                        "QUESTION",
                        question.id,
                        event.target.value
                      )
                    }
                  />
                  <label>Question {index + 1} 's description</label>
                </div>
                <div className="group-upload">
                  <label className="label-upload" htmlFor={`${question.id}`}>
                    Upload img
                  </label>
                  <input
                    id={`${question.id}`}
                    type="file"
                    hidden
                    onChange={(event) =>
                      handleOnChangeFileQuestion(question.id, event)
                    }
                  />
                  <span>
                    {question.imageName !== ""
                      ? question.imageName
                      : "No file is uploaded"}
                  </span>
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
                        onChange={(event) =>
                          handleAnswerQuestion(
                            "CHECKBOX",
                            answer.id,
                            question.id,
                            event.target.checked
                          )
                        }
                      />
                      <div className="form-floating answer-name">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name@example.com"
                          value={answer.description}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "INPUT",
                              answer.id,
                              question.id,
                              event.target.value
                            )
                          }
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
      {questions && questions.length > 0 && (
        <div>
          <button
            className="btn btn-warning"
            onClick={() => handleSubmitQuestionForQuiz()}
          >
            Save Questions
          </button>
        </div>
      )}
    </div>
  );
};
export default Questions;
