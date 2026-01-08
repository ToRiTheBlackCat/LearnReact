import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";

const DetailQuiz = () => {
  const params = useParams();
  const { id } = params;

  alert("Detail Quiz ID: " + id);

  useEffect(() => {
    fetchQuizDetail();
  }, [id]);

  const fetchQuizDetail = async () => {
    //call api get detail quiz
    const res = await getDataQuiz(id);
    if (res && res.EC === 0) {
      //   setArrQuiz(res.DT);
      console.log("check detail quiz data: ", res);
    }
  };

  return <div className="detail-quiz-container">DetailQuiz</div>;
};
export default DetailQuiz;
