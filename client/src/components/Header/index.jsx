import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Navbar, Container, Row, Col } from 'react-bootstrap';
import Auth from '../../utils/auth';
import Login from '../../pages/Login';
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
   
  };
  return (
    <header className=" text-light mb-4 px-3 d-flex justify-content-between align-center">
      <div clasName="navAbove">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">NeighborLY</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/package">Notify Package</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/board">Community Board</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/tools">Tool Library</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
   

          {Auth.loggedIn() ? (
            <div>
              <Link className="btn btn-lg btn-info m-2" to="/">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <Link className="btn btn-lg btn-light m-2" 
               to="/login">
                Logout
              </Link>
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
