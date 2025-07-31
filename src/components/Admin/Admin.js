import SideBarAdmin from "./SideBarAdmin";
import "./Admin.scss";

const Admin = () => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <SideBarAdmin />
      </div>
      <div className="admin-content">CONTENT</div>
    </div>
  );
};

export default Admin;
