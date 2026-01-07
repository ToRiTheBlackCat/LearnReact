import axios from "../utils/axiosCustomize";

const postCreateUsers = (email, password, userName, role, image) => {
  //Submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

const putUpdateUsers = (id, userName, role, image) => {
  //Submit data
  const data = new FormData();
  data.append("id", id);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data); //form-data
};

const deleteUsers = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};

const getUsersWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  //delay is optional - using for testing loading
  return axios.post("api/v1/login", { email, password, delay: 2000 }); //x-www-form-urlencoded
};

const postRegister = (email, password, username) => {
  const trimmedEmail = email.trim();
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  return axios.post("api/v1/register", {
    email: trimmedEmail,
    username: trimmedUsername,
    password: trimmedPassword,
  }); //x-www-form-urlencoded
};

export {
  postCreateUsers,
  getAllUsers,
  putUpdateUsers,
  deleteUsers,
  getUsersWithPaginate,
  postLogin,
  postRegister,
};
