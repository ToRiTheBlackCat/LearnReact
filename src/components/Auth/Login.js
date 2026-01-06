import { useState } from "react";
import "./Login.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import userReducer from "../../redux/reducer/userReducer";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();
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

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    //Validate
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("password is required");
      return;
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email format");
      return;
    }

    //Handle
    let res = await postLogin(email, password);

    //Show error or success toast message
    if (res && res.EC === 0) {
      dispatch({
        type: "FETCH_USER_LOGIN_SUCCESS",
        payload: res.DT,
      }); //dispatch action to redux

      toast.success(res.EM);
      //Check role and navigate
      if (res.DT.role === "ADMIN") {
        navigate("/admins");
        return;
      }

      navigate("/");
    } else if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => handleSignup()}>Sign Up</button>
      </div>
      <div className="title col-4 mx-auto">MINH TRI Website</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
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
        <span className="forgot-password">Forgot your password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleLogin()}>
            Login
          </button>
        </div>
        <div className="text-center back">
          <span onClick={() => handleGoBackHomePage()}>👈 Go to homepage</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
