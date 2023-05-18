  
  import { Link } from "react-router-dom";
  import navLogo from "../assets/Flat_Finder_Wordmark.png";
  import styles from "./css/navbar.css";
  import Button from "react-bootstrap/Button";
  import Container from "react-bootstrap/Container";
  import Cookies from "js-cookie";
  import Form from "react-bootstrap/Form";
  import Nav from "react-bootstrap/Nav";
  import Navbar from "react-bootstrap/Navbar";
  import NavDropdown from "react-bootstrap/NavDropdown";
  import { Badge } from "react-bootstrap";

  function Navigationbar() {
    return (
      <>
        <Navbar bg="black" expand="sm">
          <Container fluid>
            <Navbar.Brand href="/">
              <img src={navLogo} className="logo" alt="Flat Finder"/>
            </Navbar.Brand>
            {Cookies.get('user')?
              JSON.parse(Cookies.get('user')).isAdmin?
            <Badge bsPrefix={styles.azure} className={styles.azure} id="azure">
              Admin Mode
            </Badge> : <p></p>:<p></p>
            }
            

            {/* Navbar links div class */}
            <div className="navbar-links">
              <Nav>
                {/* Home link */}
                {/* <Nav.Link href="/">
                  <Link to="/">
                    <span className="navbar_section">Home</span>
                  </Link>
                </Nav.Link> */}

                {/* Listing link */}
                <Nav.Link href="/listing">
                  <Link to="/listing">
                    <span className="navbar_section">Properties</span>
                  </Link>
                </Nav.Link>
                {Cookies.get('user') && JSON.parse(Cookies.get('user')).isAdmin ?
                  <Nav.Link href="/reports">
                    <Link to="/reports">
                      <span className="navbar_section">Reports</span>
                    </Link>
                  </Nav.Link>
                  : null
                }

                {/* Login link */}
                {/* Login link */}
                {!(Cookies.get("user") && Cookies.get("user") !== "undefined" && Cookies.get("user") !== "null") ? 
                  <Nav.Link href="/" style={{ paddingRight: "5%" }}>
                    <Link to="/login">
                      <span className="navbar_section">Login</span>
                    </Link>
                  </Nav.Link>
                  :
                  <Nav.Link href="/" style={{ paddingRight: "5%" }}>
                    <Link>
                      <span onClick={() => { Cookies.remove("user"); window.location.reload(); alert("Logged out successfully!")}} className="navbar_section">Logout</span>
                    </Link>
                  </Nav.Link>
                }

                {/* Search bar */}
                {/* <Form className="d-flex" style={{ width: "100%" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search for properties"
                    className="me-2"
                    aria-label="Search"
                    style={{ backgroundColor: "transparent", marginRight: "0.5em"}}
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}

                {/* Profile dropdown */}
                <NavDropdown
                  title={<span className="navbar_section">Profile</span>}
                  id={`offcanvasNavbarDropdown-expand-${"sm"}`}
                  className="d-flex align-items-center"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Edit Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item as={Link} to="/inbox">
                    Inbox
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {Cookies.get('user') && JSON.parse(Cookies.get('user')).isAdmin ?
                    null :
                    <NavDropdown.Item as={Link} to="/myPosts">
                      My Posts
                    </NavDropdown.Item>
                  }
                </NavDropdown>
              </Nav>
            </div>
            
            {/* Navbar toggle */}
            {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> */}
            
          </Container>
        </Navbar>
      </>
    );
  }

  export default Navigationbar;