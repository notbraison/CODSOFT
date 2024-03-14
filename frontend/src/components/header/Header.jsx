import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";
// import { HiOutlineMenuAlt3 } from "react-icons/hi";


const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Website
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${showMenu ? "show" : ""}`}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                  onClick={hideMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admin/home"
                  className="nav-link"
                  activeClassName="active"
                  onClick={hideMenu}
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    activeClassName="active"
                    onClick={hideMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    activeClassName="active"
                    onClick={hideMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
              <Link to="/">
                <button className="btn btn-primary mx-2">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
