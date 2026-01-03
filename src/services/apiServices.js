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
  return axios.put("api/v1/participant", data);
};

const deleteUsers = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};

const getUsersWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

export {
  postCreateUsers,
  getAllUsers,
  putUpdateUsers,
  deleteUsers,
  getUsersWithPaginate,
};
