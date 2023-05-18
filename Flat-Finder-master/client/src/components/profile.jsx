import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Card,
  ListGroup,
  Modal,
  Badge,
} from "react-bootstrap";
import { useState } from "react";

import placeholderImg from "../assets/placeholderProfile.jpg";

import { BsFillTelephoneFill, BsHouseUpFill } from "react-icons/bs";
import { FaSearchLocation } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { TiTick } from "react-icons/ti";

const employee = [
  {
    name: "Name",
    gender: "Him",
    program: "Programe",
    currentLocation: "London, E1",
    locationInterest: "Ends",
    phoneNumber: "+44 6789 212",
    perference: "No Smoking, No Pets",
    searchStatus: "Urgent",
  },
];

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  //remove redundant stuff
  const handleClose = () => setShowModal(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    //send to db 
  };

  const handleSubmit = (event) => {
    // Handle form submission here
    closeModal();
  };

  const [name, setName] = useState(employee.name);
  const [gender, setGender] = useState(employee.gender);
  const [program, setProgram] = useState(employee.program);
  const [currentLocation, setCurrentLocation] = useState(
    employee.currentLocation
  );
  const [locationInterest, setLocationInterest] = useState(
    employee.locationInterest
  );
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  const [preference, setPreference] = useState(employee.preference);
  const [searchStatus, setSearchStatus] = useState(employee.searchStatus);

  //make modal able to submit data with post + add validation

  return (
    <Container>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProgram">
              <Form.Label>Program</Form.Label>
              <Form.Control
                type="text"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCurrentLocation">
              <Form.Label>Current Location</Form.Label>
              <Form.Control
                type="text"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocationInterest">
              <Form.Label>Location Interest</Form.Label>
              <Form.Control
                type="text"
                value={locationInterest}
                onChange={(e) => setLocationInterest(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPreference">
              <Form.Label>Preference</Form.Label>
              <Form.Control
                type="text"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSearchStatus">
              <Form.Label>Search Status</Form.Label>
              <Form.Control
                type="text"
                value={searchStatus}
                onChange={(e) => setSearchStatus(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              handleSave({
                name,
                gender,
                program,
                currentLocation,
                locationInterest,
                phoneNumber,
                preference,
                searchStatus,
              })
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Row
        style={{ padding: "7rem 0" }}
        className="justify-content-center align-items-center"
      >
        <Col className="center">
          <Card
            style={{
              width: "70%",
              margin: "0.5rem",
              boxShadow: "0px 0px 20px rgba(10, 10, 10, 0.05)",
            }}
          >
            <Card.Body className="center">
              <Image
                src={placeholderImg}
                style={{
                  width: "calc(150px + 10vw)",
                  borderRadius: "100rem",
                  padding: "1rem",
                  margin: "0.25",
                }}
              />
              <Button variant="outline-primary">Upload Picture</Button>
              <ListGroup variant="flush" className="border-0">
                <ListGroup.Item className="text-center border-0">
                  <Card.Title>John Wick</Card.Title>
                </ListGroup.Item>
                <ListGroup.Item className="text-center border-0 text-muted">
                  He/Him
                </ListGroup.Item>
                <ListGroup.Item className="text-center border-0">
                  <Card.Subtitle></Card.Subtitle>
                </ListGroup.Item>

                <Container fluid className="mt-2 mb-5">
                  <Row>
                    <Col className="text-muted">
                      <HiLocationMarker />
                      <b className="ml-3">Programme:</b>
                    </Col>
                    <Col>
                      <Badge>Graduate</Badge>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-muted">
                      <HiLocationMarker />
                      <b className="ml-3">Current Location:</b>
                    </Col>
                    <Col>Pendle Hill, Lancashire</Col>
                  </Row>

                  <Row>
                    <Col className="text-muted">
                      <FaSearchLocation />
                      <b>Location of interest:</b>
                    </Col>
                    <Col>Manchester M2 7LE</Col>
                  </Row>

                  <Row>
                    <Col className="text-muted">
                      <BsFillTelephoneFill />
                    </Col>
                    <Col>
                      <h6>
                        <Badge bg="success">+44 7982 123141</Badge>
                      </h6>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="text-muted">
                      <TiTick />
                      <b>Preferences:</b>
                    </Col>
                    <Col>
                      <Badge bg="danger">No Smoking</Badge>
                      <Badge bg="danger">No Pets </Badge>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="text-muted">
                      <BsHouseUpFill />
                      <b>Search status:</b>
                    </Col>
                    <Col>
                      <Badge bg="danger">Urgent</Badge>
                    </Col>
                  </Row>
                </Container>
              </ListGroup>
              <Button variant="primary" onClick={openModal}>
                Edit Details
              </Button>{" "}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h1 className="text-muted" style={{ marginBottom: "10%" }}>
            Want to amend your details?
          </h1>
          <Form style={{ width: "70%" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Edit Password</Form.Label>
              <Form.Control type="password" placeholder="Edit Password" />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              style={{ marginTop: "10%" }}
              onClick={show}
            >
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
