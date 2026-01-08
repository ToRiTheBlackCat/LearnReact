import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      {/* Dùng Outlet để vẫn giữ thằng cha nhưng render thêm thằng con */}
      <div className="header-container">
        <Header />
      </div>
      {/* <div className="main-container">
        <div className="sidenav-container"></div>
      </div> */}
      <div className="app-content">
        <Outlet />
      </div>
      {/* <div>
        test link
        <div>
          <button>
            <Link to="/users">Go To User Page</Link>
          </button>
          <button>
            <Link to="/admins">Go To Admin Page</Link>
          </button>
        </div>
      </div> */}
    </div>
  );
};
export default App;

//Steps to use Redux
//1. Initialize dispatch + actions
//2. Initialize reducer + logic
//3. Use state of Redux
