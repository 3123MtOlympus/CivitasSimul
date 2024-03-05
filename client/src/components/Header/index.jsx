import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Navbar, Container, Row, Col } from 'react-bootstrap';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" text-light mb-4 px-3 d-flex justify-content-between align-center">
      <div className="navAbove">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">NeighborLY</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/package">Notify Package</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/board">Community Board</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tools">Tool Library</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
   

          {Auth.loggedIn() ? (
            <div>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link className="btn btn-lg btn-info" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light" to="/signup">
                Signup
              </Link>
            </>
          )}
     </header>
  );
};

export default Header;
