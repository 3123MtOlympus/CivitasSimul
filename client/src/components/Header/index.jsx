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
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center"> 
    {/* <Container>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">React Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Button variant="outline-success">Button</Button>
      </Navbar.Collapse>
    </Navbar>
    <Row>
      <Col>
        <Button variant="primary">Primary</Button>
      </Col>
      <Col>
        <Button variant="secondary">Secondary</Button>
      </Col>
    </Row>
  </Container> */}
      <div className="container flex-row justify-space-between-lg justify-center align-center">
      <div>
        </div>
  <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
