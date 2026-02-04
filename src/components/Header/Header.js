import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { logout } from "../../services/apiServices";
import { Toast } from "bootstrap";
import Language from "./Language";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.log(">>> check account redux: ", account, isAuthenticated);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    } else {
      Toast.error(res.EM);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">TRI DEP TRAI</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          TRI DEP TRAI
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {/* NavLink hỗ trợ className Active (tô đậm chữ khi chọn) */}
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>

            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="users">User</Nav.Link>
            <Nav.Link href="admins">Admin</Nav.Link> */}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  LOGIN
                </button>
                <button className="btn-signup" onClick={() => handleSignup()}>
                  SIGNUP
                </button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogOut()}>
                  Log out
                </NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}

            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
