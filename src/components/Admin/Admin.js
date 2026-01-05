import SideBarAdmin from "./SideBarAdmin";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Admin.scss";
const Admin = () => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <SideBarAdmin />
      </div>
      <div className="admin-content">
        {/* <div className="admin-header"></div> */}
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
