import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../storage/UserContext";
import { logOut } from "../service/usersService";

const Header = () => {
  const { loggedIn, logOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const shouldLogOut = window.confirm("Are you sure?");
    if (shouldLogOut) {
      logOut().then(({ data }) => {
        logOutUser(data);
        localStorage.removeItem("access_token");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        navigate("/login");
      });
    }
  };

  return (
    <div>
      <nav className="nav affix">
        <div className="container">
          <div className="logo">
            <Link to="/">Galleries</Link>
          </div>
          {/* <div className="user_div">
            {loggedIn ? (
              <ul>
                <li className="user">
                  <Link to="#">
                    {user?.user.first_name} {user?.user.last_name}
                  </Link>
                </li>
              </ul>
            ) : null}
          </div> */}
          <div id="mainListDiv" className="main_list">
            <ul className="navlinks">
              {loggedIn ? (
                <>
                  <li>
                    <Link to="/create">Create New Gallery</Link>
                  </li>
                  <li>
                    <Link to="/my-galleries">My Galleries</Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-outline-danger"
                      type="submit"
                      onClick={() => handleLogOut()}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/"></Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
