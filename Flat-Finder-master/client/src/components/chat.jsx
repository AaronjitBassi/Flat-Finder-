import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  InputGroup,
  Form,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { useState } from "react";

import Man from "../assets/businessman.jpg";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const responseMessages = [
    "I found this property with 4 reservations. Would you like to try it?", 
    "Amazing, Ill get back to you when I have more information", 
    "Do you mind being more than 40mins away from the office?", 
    "Fantastic!"];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message !== "") {
      const responseIndex = Math.floor(Math.random() * responseMessages.length);
      const responseMessage = responseMessages[responseIndex];
      setMessages([...messages, { message: message, sender: "user" }, { message: responseMessage, sender: "bot" }]);
      setMessage("");
    }
  };

  const handleDelete = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Container style={{ padding: "7rem 0" }}>
        <Row className="d-flex justify-content-center align-items-center flex-row">
          <Col sm={3}>
            <Card style={{ width: "100%", height: "500px" }} className="text-center">
              <Card.Img variant="top" src={Man} />
              <Card.Body className="mx-auto">
                <Card.Title>Phil Mitchells</Card.Title>
                <Card.Subtitle>Graduaye</Card.Subtitle>
                <Badge bg="danger">Available</Badge>
              </Card.Body>
              <Card.Footer>
              <Card.Subtitle variant>FDM Status: Looking for flatmate</Card.Subtitle>
                <Button
                    variant="danger"
                    type="submit"
                    style={{ margin: "1rem 0rem" }}
                  >
                    Report Post
                  </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col sm={6}>
            <Card
              style={{ width: "100%", height: "500px", overflowY: "scroll" }}
            >
              <Card.Header style={{position: "sticky", top: "0", width: "100%", backgroundColor: "lightgray", zIndex: "5"}}>
                <Card.Title>Chat</Card.Title>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  <ListGroup.Item
                    style={{ width: "65%", marginRight: "30%", marginBottom: "1rem"}}
                    variant="secondary"
                  >
                    Hi there, I saw your profile and I would like to buddy up and find a property with you!
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                  {messages.map((message, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{ width: "65%", marginLeft: message.sender === "user" ? "30%" : "", marginBottom: "1rem" }}
                      variant={message.sender === "user" ? "success" : "secondary"}
                    >
                      {message.message}
                      {message.sender === "user" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ float: "right" }}
                        onClick={() => handleDelete(index)}
                      >
                        X
                      </Button>
                         )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
              <Card.Footer style={{position: "sticky", bottom: "0", width: "100%", backgroundColor: "lightgray"}}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="message">
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        aria-label="text"
                        type="text"
                        placeholder="Enter message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ margin: "1rem 0rem" }}
                  >
                    Send
                  </Button>
                </Form>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


