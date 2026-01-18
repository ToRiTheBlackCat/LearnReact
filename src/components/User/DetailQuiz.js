import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const [quizTitle, setQuizTitle] = useState("");
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   if (location && location.state && location.state.quizTitle) {
  //     setQuizTitle(location.state.quizTitle);
  //   }
  // }, [location]);

  const { id } = params;

  useEffect(() => {
    if (location && location.state && location.state.quizTitle) {
      setQuizTitle(location.state.quizTitle);
      console.log("check quiz title: ", location.state.quizTitle);
    }

    fetchQuizDetail();
  }, [id, location]);

  const fetchQuizDetail = async () => {
    //call api get detail quiz
    const res = await getDataQuiz(id);

    if (res && res.EC === 0) {
      //   setArrQuiz(res.DT);
      console.log("check detail quiz data: ", res);

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

            //Push các câu trả lời vào mảng answers
            answers.push(item.answers);
            // console.log("check item answer: ", item.answers);
          });
          return {
            questionId: key,
            answers,
            questionDescription,
            image,
          };
        })
        .value();

      console.log("check data group by id: ", data);
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
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {id}: {quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-success" onClick={() => handleNext()}>
            Next
          </button>
        </div>
        <div></div>
      </div>

      <div className="right-content">Cound down</div>
    </div>
  );
};
export default DetailQuiz;
