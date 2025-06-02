import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from './imgs/logo.png'

function Navb({ setRole }) {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{}}/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link}to='/'>Home</Nav.Link>
          </Nav>
          <Nav>
          <NavDropdown title="Login" id="collapsible-nav-dropdown" style={{'color':'#ffffff'}}>
              <NavDropdown.Item as={Link}to='/VolunteerLogin'>Volunteer</NavDropdown.Item>
              <NavDropdown.Item as={Link}to='/Login'>User</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;