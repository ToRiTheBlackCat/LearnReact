import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { postUpdatePassword } from "../../../services/apiServices";

const UserPassword = (props) => {
  const [oldpassword, setOldPassword] = useState("");
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);

  const [newpassword, setNewPassword] = useState("");
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);

  const [confirmpassword, setConfirmPassword] = useState("");
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const handleUpdatePassword = async () => {
    //Validate
    if (!oldpassword) {
      toast.error("Old password is required");
      return;
    }
    if (!newpassword) {
      toast.error("New password is required");
      return;
    }
    if (!confirmpassword) {
      toast.error("Confirm password is required");
      return;
    }
    if (newpassword !== confirmpassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    //Call API update password
    const res = await postUpdatePassword(oldpassword, newpassword);
    console.log("res update password", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      //Clear input
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="user-password-container">
      <div className="user-password-content">
        <form className="row g-3">
          {/* Old Password */}
          <div className="col-md-8 form-group">
            <label className="form-label lable">Old Password (*)</label>
            <input
              type={isShowOldPassword ? "text" : "password"}
              className="form-control"
              value={oldpassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
            <span
              className="icon-eye"
              onClick={() => setIsShowOldPassword(!isShowOldPassword)}
            >
              {isShowOldPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {/* New Password */}
          <div className="col-md-8 form-group">
            <label className="form-label lable">New Password (*)</label>
            <input
              type={isShowNewPassword ? "text" : "password"}
              className="form-control"
              value={newpassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <span
              className="icon-eye"
              onClick={() => setIsShowNewPassword(!isShowNewPassword)}
            >
              {isShowNewPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {/* Confirm Password */}
          <div className="col-md-8 form-group">
            <label className="form-label lable">Confirm Password (*)</label>
            <input
              type={isShowConfirmPassword ? "text" : "password"}
              className="form-control"
              value={confirmpassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <span
              className="icon-eye"
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              {isShowConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </form>
        <div className="col-md-12 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => handleUpdatePassword()}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserPassword;
