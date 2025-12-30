import SideBarAdmin from "./SideBarAdmin";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "./Admin.scss";
const Admin = () => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <SideBarAdmin />
      </div>
      <div className="admin-content">
        <div className="admin-header"></div>
        <div className="admin-main">
          <Outlet />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Zoom}
        />
      </div>
    </div>
  );
};

export default Admin;
