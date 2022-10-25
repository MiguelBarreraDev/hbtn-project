import { Fragment } from "react";
import { Link } from "react-router-dom";

/* Styles */
import "./header.scss";

export default function Header() {
  return (
    <Fragment>
      <nav className="header">
        <div className="logo flex">
          <Link to="/">
            <img
              src="https://holberton.anahuac.mx/wp-content/uploads/Group-359.png"
              alt="logo"
            />
          </Link>
        </div>
        <hr />
        <div className="links">
          <ul>
            <li>
              <Link to="/users">
                <i className="fi fi-ss-user"></i>
              </Link>
            </li>
            <li>
              <Link to="/students">
                <i className="fi fi-ss-users-alt"></i>
              </Link>
            </li>
            <li>
              <Link to="">
                <i className="fi fi-ss-settings"></i>
              </Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="logout flex">
          <Link to="">
            <i className="fi fi-br-sign-out-alt"></i>
          </Link>
        </div>
      </nav>
      <div className="header-separator">
        &nbsp;
      </div>
    </Fragment>
  );
}
