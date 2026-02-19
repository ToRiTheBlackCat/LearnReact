import { NavLink, Link, useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const SideBarAdmin = ({ collapsed }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2 className="logo" onClick={() => navigate("/")}>
        Minh Tri Dep Trai✨
      </h2>
      <ul className="menu">
        <li>
          <Link to="/admins">{t("adminPage.sideMenu.dashboard")}</Link>
        </li>
        <li>
          <Link to="/admins/manage-users">
            {t("adminPage.sideMenu.manageUser")}
          </Link>
        </li>
        <li>
          <Link to="/admins/manage-quizzes">
            {t("adminPage.sideMenu.manageQuiz")}
          </Link>
        </li>
        <li>
          <Link to="/admins/manage-questions">
            {t("adminPage.sideMenu.manageQuestions")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBarAdmin;
