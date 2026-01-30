import { useEffect, useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { GoPlusCircle } from "react-icons/go";
import { LuOctagonMinus } from "react-icons/lu";
import { TbSquareRoundedMinus } from "react-icons/tb";
import { PiPlusCircleFill } from "react-icons/pi";
import { v4 as uuidv4, validate } from "uuid";
import _, { every, toUpper } from "lodash";
import Lightbox from "react-awesome-lightbox";
import { ToastContainer, toast, Zoom } from "react-toastify";

import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiServices";

const Questions = (props) => {
  const initQuestions = [
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
  ];
  const [questions, setQuestions] = useState(initQuestions);

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

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

  const handleSubmitQuestionForQuiz = async () => {
    console.log(questions, selectedQuiz);

    // Validate data
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz");
      return;
    }

    //validate input data
    let isValidAns = true;
    let isValidQues = true;
    let indexQues = 0,
      indexAns = 0,
      errCount = 0;

    for (let i = 0; i < questions.length; i++) {
      //Check question description
      if (!questions[i].description) {
        isValidQues = false;
        indexQues = i;
        errCount++;
        break;
      }
      //Check if at least 1 correct ans
      let currentAns = questions[i].answers;
      let hasAtLeastOneCorrect = currentAns.some(
        (ans) => ans.isCorrect === true
      );
      if (hasAtLeastOneCorrect === false) {
        isValidQues = false;
        indexQues = i;
        toast.error(`Question ${i + 1} needs at least one correct answer`);
        return;
      }
      if (isValidQues === false) break;

      //Check answer
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAns = false;
          indexAns = j;
          indexQues = i;
          errCount++;
          break;
        }
      }
      if (isValidAns === false) break;
    }
    //Show error
    if (isValidQues === false) {
      toast.error(
        `Invalid input. Required description of Question ${indexQues + 1}`
      );
      indexQues = 0;
      errCount = 0;
      return;
    }
    if (isValidAns === false) {
      toast.error(
        `Invalid input. Required field at Answer ${indexAns + 1} of Question ${
          indexQues + 1
        }`
      );
      indexAns = 0;
      indexQues = 0;
      errCount = 0;
      return;
    }

    console.log("ERRCOunt", errCount);
    console.log(isValidAns, "Q= ", indexQues, "A= ", indexAns);

    //validate question

    // Cách 1: dùng Promise.all - ko theo trình tự do chạy Parallel
    // await Promise.all(
    //   questions.map(async (ques) => {
    //     const q = await postCreateNewQuestionForQuiz(
    //       +selectedQuiz.value,
    //       ques.description,
    //       ques.imageFile
    //     );
    //     //Submit answers
    //     await Promise.all(
    //       ques.answers.map(async (ans) => {
    //         await postCreateNewAnswerForQuestion(
    //           ans.description,
    //           ans.isCorrect,
    //           q.DT.id
    //         );
    //       })
    //     );
    //   })
    // );

    //Cách 2 dùng For object - Đảm bảo chạy theo trình tự
    for (const ques of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        ques.description,
        ques.imageFile
      );
      //Answer
      for (const ans of ques.answers) {
        await postCreateNewAnswerForQuestion(
          ans.description,
          ans.isCorrect,
          q.DT.id
        );
      }
    }

    if (errCount === 0) {
      toast.success("Create success");
      setQuestions(initQuestions);
    }
  };

  const handlePreviewImage = (quesId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === quesId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
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
            options={listQuiz}
            placeholder="Choose a Quiz"
            styles={{
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
            }}
          />
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
                      {question.imageName !== "" ? (
                        <span
                          className="preview-image-name"
                          onClick={() => handlePreviewImage(question.id)}
                        >
                          {question.imageName}{" "}
                        </span>
                      ) : (
                        "No file is uploaded"
                      )}
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
        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};
export default Questions;
