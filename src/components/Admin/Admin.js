import SideBarAdmin from "./SideBarAdmin";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./Admin.scss";
import Language from "../Header/Language";
import { NavDropdown } from "react-bootstrap";

const Admin = () => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <SideBarAdmin />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <Language />
          <NavDropdown title="Setting" id="basic-nav-dropdown">
            <NavDropdown.Item>Log out</NavDropdown.Item>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </NavDropdown>
        </div>
        <PerfectScrollbar>
          <div className="admin-main">
            <Outlet />
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default Admin;
