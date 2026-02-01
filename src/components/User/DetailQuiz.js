import { useEffect, useState } from "react";
import { useParams, useLocation, data } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const [quizTitle, setQuizTitle] = useState("");
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setdataModalResult] = useState({});

  const { id } = params;

  useEffect(() => {
    if (location && location.state && location.state.quizTitle) {
      setQuizTitle(location.state.quizTitle);
    }

    fetchQuizDetail();
  }, [id, location]);

  const fetchQuizDetail = async () => {
    //call api get detail quiz
    const res = await getDataQuiz(id);

    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw) //Dùng thư viện lodash
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (questionId), `data` is the array of objects
        .map((value, key) => {
          let answers = [];

          //Khai báo để hứng dữ liệu tương ứng mỗi lần lặp
          let questionDescription,
            image = null;

          //Lặp qua từng phần tử của nhóm hiện tại để lấy dữ liệu
          value.forEach((item, index) => {
            //Gán 1 lần do sẽ trùng với mấy thằng sau vì đã group
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            // set answered flag
            item.answers.isSelected = false;

            //Push các câu trả lời vào mảng answers
            answers.push(item.answers);
          });
          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckbox = (answerId, questionId) => {
    //Clone data quiz using lodahs and cloneDeep func
    //React hook doesn't merge state
    let dataQuizClone = _.cloneDeep(dataQuiz);

    //Find question that has answers updated
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );

    //Loop to find ans
    if (question && question.answers) {
      // Create temp list to update ans
      let b = question.answers.map((item) => {
        //If found
        if (+item.id === +answerId) {
          //Checked - set to True
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      //Set temp to answer that updated again
      question.answers = b;
    }

    //Find updated index
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    //If found > -1
    if (index > -1) {
      //set again to question that updated
      dataQuizClone[index] = question;
      //set to real dataQuiz with React
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinishQuiz = async () => {
    console.log("Check data before submit", dataQuiz);

    let payload = { quizId: +id, answers: [] };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.questionId;
        let userAnswerId = [];

        //Todo : userAnswerId
        item.answers.forEach((ans) => {
          if (ans.isSelected) {
            userAnswerId.push(ans.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });

      payload.answers = answers;

      //Submit API
      let res = await postSubmitQuiz(payload);

      console.log("response: ", res);

      if (res && res.EC === 0) {
        setdataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("Something wrongs....");
      }
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {id}: {quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <div className="q-content">
            <Question
              index={index}
              handleCheckbox={handleCheckbox}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
        </div>

        <div className="footer">
          <button className="btn btn-primary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-success" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
        <div></div>
      </div>

      <div className="right-content">
        <RightContent dataQuiz={dataQuiz} handleFinishQuiz={handleFinishQuiz} />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};
export default DetailQuiz;
