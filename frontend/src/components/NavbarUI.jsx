import PropTypes from "prop-types";
import { Navbar, Nav, Container, Image, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavbarUI = ({ headTitle, navLinks, user, isAuthenticated, onLogout, onAccountDelete }) => {
  const location = useLocation();

  return (
    <Navbar  expand="lg" className="fixed-top" style={{backgroundColor:"#f9f9fb"}}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-auto px-3">{headTitle}</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-content" />

        <Navbar.Collapse id="navbar-content" className="px-5">
          <Nav className="ms-auto">

            {navLinks.map((link, index) => (
                <Nav.Link
                  as={Link}
                  key={index}
                  to={link.path}
                  style={{
                    backgroundColor: location.pathname === link.path ? "#0b4a8b" : "transparent",
                    color: location.pathname === link.path ? "white" : "#000",
                    borderRadius: "4px",
                    width: "100px",
                    margin: "0 5px",
                    padding: "6px 12px"}}
                    >{link.label}
                </Nav.Link>))
              }

            {isAuthenticated && user && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-secondary" className="d-flex align-items-center border border-0">
                  <Image src={user.profileImageUrl} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://www.gravatar.com/avatar?d=identicon";
                        }}
                          roundedCircle width="30" height="30" className="me-2" />
                  <span>{user.fullname}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {/* <Dropdown.Item onClick={onLogout}>Log out</Dropdown.Item> */}
                  <Dropdown.Item onClick={onAccountDelete} className="text-danger">Delete Account</Dropdown.Item>
                  <Dropdown.Item onClick={onLogout} className="text-primary">Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavbarUI.propTypes = {
  headTitle: PropTypes.string.isRequired,
  navLinks: PropTypes.array.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onAccountDelete: PropTypes.func.isRequired, 
};

export default NavbarUI;
