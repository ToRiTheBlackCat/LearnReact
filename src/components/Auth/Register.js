import { useState } from "react";
import "./Register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Language from "../Header/Language";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleGoBackHomePage = () => {
    navigate("/");
  };

  const handleGoBackLogin = () => {
    navigate("/login");
  };

  const handleSignup = async () => {
    //Validate
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email format");
      return false;
    }
    if (!password) {
      toast.error("password is required");
      return false;
    }
    if (!confirmPassword) {
      toast.error("Confirm password is required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    //Handle
    let res = await postRegister(email, password, !username ? "" : username);
    console.log(">>> check res from register: ", res);
    // Show error or success toast message
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    } else if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Already had an account ?</span>
        <button onClick={() => handleGoBackLogin()}>Login</button>
        <Language />
      </div>
      <div className="title col-4 mx-auto">MINH TRI Website</div>
      <div className="welcome col-4 mx-auto">Register your new account</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span
            className="icon-eye"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="form-group">
          <label>Confirm Password (*)</label>
          <input
            type={isShowConfirmPassword ? "text" : "password"}
            className="form-control password-input"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <span
            className="icon-eye"
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          >
            {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type={"text"}
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <button className="btn-submit" onClick={() => handleSignup()}>
            Create new account
          </button>
        </div>
        <div className="text-center back">
          <span onClick={() => handleGoBackHomePage()}>👈 Go to homepage</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
