import axios from "axios";

const postCreateUsers = (email, password, userName, role, image) => {
  //Submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("http://localhost:8081/api/v1/participant", data);
};
export { postCreateUsers };
