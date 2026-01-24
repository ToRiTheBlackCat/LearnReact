import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import Dashboard from "./components/Admin/Content/Dashboard";
import Login from "./components/Auth/Login";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";

const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">404 Not Found Data</div>
  );
};

const Layout = (props) => {
  return (
    <>
      <Routes>
        {/* Tránh hàm event.preventDefault của tag a cổ điển - ko gây load trang */}
        <Route path="/" element={<App />}>
          {/* Index Route để chỉ định component default */}
          <Route index element={<HomePage />} />

          {/* Nested route */}
          <Route path="/users" element={<ListQuiz />} />
        </Route>

        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route path="/admins" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
    </>
  );
};
export default Layout;
