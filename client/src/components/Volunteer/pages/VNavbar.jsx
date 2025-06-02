import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../imgs/logo.png'

function VNavbar({ setRole }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        setRole("null");
        localStorage.clear();
        navigate("/");
    };
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="dark">
      <Container>
      <Navbar.Brand>
            <img
              alt="props"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            /></Navbar.Brand>
        <Navbar.Brand as={Link}to='/'>Volunteer Verse</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link}to='/'>Home</Nav.Link>
            <Nav.Link as={Link}to='/Register'>Register</Nav.Link>
            <Nav.Link as={Link}to='/Application'>Application</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default VNavbar;