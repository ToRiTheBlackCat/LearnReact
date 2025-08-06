import { NavLink, Link } from "react-router-dom";

const SideBarAdmin = ({ collapsed }) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2 className="logo">Minh Tri Dep Trai✨</h2>
      <ul className="menu">
        <li>
          <Link to="/admins" end>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admins/manage-users">User</Link>
        </li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default SideBarAdmin;
