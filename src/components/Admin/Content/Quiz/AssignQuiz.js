import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getAllQuizForAdmin,
  getAllUsers,
  postAssignQuizToUser,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";

const AssignQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    fetchQuiz();
    fetchUser();
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

  const fetchUser = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };

  const handleAssignQuizToUser = async () => {
    //Validate
    if (!selectedQuiz) {
      toast.error("Please select Quiz to assign to user");
    }
    if (!selectedUser) {
      toast.error("Please select User to be assigned");
    }

    let res = await postAssignQuizToUser(
      +selectedQuiz.value,
      +selectedUser.value
    );

    if (res && res.EC === 0) {
      toast.success(res.EM);
      //Reset data
      setSelectedQuiz(null);
      setSelectedUser(null);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label>
          {t("adminPage.content.manageQuiz.assignQuizToUser.selectQuiz")}
        </label>
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
      <div className="col-6 form-group">
        <label>
          {t("adminPage.content.manageQuiz.assignQuizToUser.selectUser")}
        </label>
        <Select
          value={selectedUser}
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
          placeholder="Choose a User"
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 9999,
            }),
          }}
        />
      </div>
      <div>
        <button
          className="btn btn-warning mt-3"
          onClick={() => handleAssignQuizToUser()}
        >
          {t("adminPage.content.manageQuiz.assignQuizToUser.button")}
        </button>
      </div>
    </div>
  );
};
export default AssignQuiz;
