import { NavLink, Link, useNavigate } from "react-router-dom";

const SideBarAdmin = ({ collapsed }) => {
  const navigate = useNavigate();
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2 className="logo" onClick={() => navigate("/")}>
        Minh Tri Dep Trai✨
      </h2>
      <ul className="menu">
        <li>
          <Link to="/admins">Dashboard</Link>
        </li>
        <li>
          <Link to="/admins/manage-users">Manage User</Link>
        </li>
        <li>
          <Link to="/admins/manage-quizzes">Manage Quiz</Link>
        </li>
        <li>
          <Link to="/admins/manage-questions">Manage Questions</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBarAdmin;
