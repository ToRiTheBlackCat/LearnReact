import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
// Bạn có thể import icon từ react-icons nếu muốn đẹp hơn, tạm thời mình dùng text (V) (X)
// import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const Question = (props) => {
  const { data, index, isShowAnswer, dataModalResult } = props; // Lấy thêm props isShowAnswer và dataModalResult
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckbox = (event, aId, qId) => {
    if (isShowAnswer) return; // Nếu đang hiện đáp án thì không cho click
    props.handleCheckbox(aId, qId);
  };

  // Hàm xử lý logic hiển thị trạng thái (Đúng/Sai)
  const getResultInfo = (answer) => {
    if (!isShowAnswer || !dataModalResult || !dataModalResult.quizData) {
      return { className: "", icon: null };
    }

    // Tìm dữ liệu kết quả của câu hỏi hiện tại
    const questionResult = dataModalResult.quizData.find(
      (item) => +item.questionId === +data.questionId
    );

    if (!questionResult) return { className: "", icon: null };

    // Check xem đáp án này có phải là đáp án đúng của hệ thống không
    const isSystemCorrect = questionResult.systemAnswers.find(
      (sys) => +sys.id === +answer.id
    );

    // Check xem user có chọn đáp án này không
    const isUserSelected = questionResult.userAnswers.includes(answer.id);

    // LOGIC 1: Là đáp án ĐÚNG của hệ thống (Luôn hiện xanh dù user có chọn hay không)
    if (isSystemCorrect) {
      return {
        className: "correct",
        icon: <span className="icon-result correct">(V)</span>, // Thay icon ở đây
      };
    }

    // LOGIC 2: User chọn nhưng SAI (Không có trong systemAnswers)
    if (isUserSelected && !isSystemCorrect) {
      return {
        className: "wrong",
        icon: <span className="icon-result wrong">(X)</span>, // Thay icon ở đây
      };
    }

    return { className: "", icon: null };
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/jpeg;base64,${data.image}`}
            alt="Question"
          />
          {isPreviewImage === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription} ?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            // Lấy thông tin class và icon cho từng câu trả lời
            const resultInfo = getResultInfo(a);

            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    disabled={isShowAnswer} // Disable input khi show answer
                    onChange={(event) =>
                      handleCheckbox(event, a.id, data.questionId)
                    }
                  />
                  <label className={`form-check-label ${resultInfo.className}`}>
                    {a.description}
                  </label>
                  {/* Hiển thị icon (V) hoặc (X) */}
                  {resultInfo.icon}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
