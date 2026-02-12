import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { postUpdateProfile } from "../../../services/apiServices";
import { doLogin, doUpdateProfile } from "../../../redux/action/userAction";

const UserProfile = () => {
  const account = useSelector((state) => state.user.account);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [reviewImg, setReviewImg] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("account", account);
    if (account) {
      setUsername(account.username);
      setImage(account.image);
      if (account.image) {
        setReviewImg(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, []);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log("upload file", file);
      const imgUrl = URL.createObjectURL(file);
      setReviewImg(imgUrl);
      setImage(file);
    } else {
    }
  };

  const handleUpdateProfile = async () => {
    //Validate
    if (!username) {
      toast.error("Invalid username");
      return;
    }
    //Call API update profile
    let data = await postUpdateProfile(username, image);
    console.log("data response", data);
    if (data && data.EC === 0) {
      toast.success(data.EM);

      let base64Image = account.image;

      if (image instanceof File) {
        const base64Full = await toBase64(image);

        base64Image = base64Full.split(",")[1];
      }

      dispatch(doUpdateProfile(username, base64Image));
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="user-profile-container">
      <div className="user-profile-content">
        <form className="row g-3">
          <div className="col-md-6">
            <label className="form-label lable">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label className="label-upload" htmlFor="labelUpload">
              <MdDriveFolderUpload />
              Upload User Image
            </label>
            <input
              type="file"
              id="labelUpload"
              hidden
              onChange={(event) => handleUploadImage(event)}
            />
          </div>
          <div className="col-md-12 img-preview">
            {reviewImg ? (
              <img src={reviewImg} alt="preview" />
            ) : (
              <span>Preview image</span>
            )}
          </div>
        </form>
        <div className="col-md-12 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => handleUpdateProfile()}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
