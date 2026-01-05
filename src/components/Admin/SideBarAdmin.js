import { NavLink, Link } from "react-router-dom";

const SideBarAdmin = ({ collapsed }) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2 className="logo">Minh Tri Dep Trai✨</h2>
      <ul className="menu">
        <li>
          <Link to="/admins">Dashboard</Link>
        </li>
        <li>
          <Link to="/admins/manage-users">User</Link>
        </li>
        <li>
          <Link to="/admins/quiz">Quiz</Link>
        </li>
        <li>
          <Link to="/admins/questions">Questions</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBarAdmin;
