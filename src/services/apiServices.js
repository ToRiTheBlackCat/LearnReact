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

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data }); //Because require body json
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  //Submit data
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.post("api/v1/quiz", data); //form-data
};

const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};

const putQuiz = (id, description, name, difficulty, quizImage) => {
  //Submit data
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put("api/v1/quiz", data); //form-data
};

const deleteQuiz = (quizId) => {
  return axios.delete(`api/v1/quiz/${quizId}`);
};

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("api/v1/question", data); //form-data
};

const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  }); //x-www-form-urlencoded
};

const postAssignQuizToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId }); //x-www-form-urlencoded
};

const logout = (email, refresh_token) => {
  return axios.post("api/v1/logout", { email, refresh_token });
};

const getQuizWithQuesAns = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

const getOverview = () => {
  return axios.get("api/v1/overview");
};

const postRefreshToken = (email, refresh_token) => {
  return axios.post("api/v1/refresh-token", { email, refresh_token }); //x-www-form-urlencoded
};

const postUpdateProfile = (username, imageFile) => {
  const data = new FormData();
  data.append("username", username);
  data.append("userImage", imageFile);
  return axios.post("api/v1/profile", data); //form-data
};

const postUpdatePassword = (current_password, new_password) => {
  return axios.post("api/v1/change-password", {
    current_password,
    new_password,
  });
};

const getQuizHistory = () => {
  return axios.get("api/v1/history");
};

export {
  postCreateUsers,
  getAllUsers,
  putUpdateUsers,
  deleteUsers,
  getUsersWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuizToUser,
  logout,
  getQuizWithQuesAns,
  postUpsertQA,
  getOverview,
  postRefreshToken,
  postUpdateProfile,
  postUpdatePassword,
  getQuizHistory,
};
