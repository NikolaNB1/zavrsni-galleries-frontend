import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="nav affix">
        <div className="container">
          <div className="logo">
            <Link to="/">Galleries</Link>
          </div>
          <div id="mainListDiv" className="main_list">
            <ul className="navlinks">
              <li>
                <Link to="#"></Link>
              </li>
              <li>
                <Link to="#"></Link>
              </li>
              <li>
                <Link to="#">Login</Link>
              </li>
              <li>
                <Link to="#">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
