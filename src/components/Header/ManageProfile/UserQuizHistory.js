import { useEffect, useState } from "react";
import { getQuizHistory } from "../../../services/apiServices";
import PerfectScrollbar from "react-perfect-scrollbar"; // Import PerfectScrollbar here
import "react-perfect-scrollbar/dist/css/styles.css";
const UserQuizHistory = () => {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    fetchUserQuizHistory();
  }, []);

  const fetchUserQuizHistory = async () => {
    let res = await getQuizHistory();
    if (res && res.EC === 0) {
      setQuizHistory(res.DT.data);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    // You can customize 'en-GB' to 'vi-VN' for Vietnamese format
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Change to false for 24h format
    });
  };

  return (
    <div className="user-quiz-container">
      <PerfectScrollbar style={{ maxHeight: "600px", overflowY: "auto" }}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Quiz</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {quizHistory &&
              quizHistory.length > 0 &&
              quizHistory.map((item, index) => (
                <tr key={item + "-" + index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <span style={{ fontSize: "18px", fontWeight: "600" }}>
                      {item?.quizHistory.name || "No quiz name"}
                    </span>
                    <br />
                    {item?.quizHistory.description || "No quiz description"}
                  </td>
                  <td>{formatDate(item?.createdAt) || "No created at"}</td>
                  <td>{formatDate(item?.updatedAt) || "No updated at"}</td>
                  <td>
                    {item?.total_correct || 0} /{item?.total_questions || 0}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </PerfectScrollbar>
    </div>
  );
};
export default UserQuizHistory;
