import { Navigate } from "react-router-dom";
import Test1 from "./Test1";
import Test2 from "./Test2";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>; //Redirect
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
