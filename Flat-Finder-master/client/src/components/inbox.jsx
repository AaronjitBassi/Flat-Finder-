import {
  Card,
  Button,
  Col,
  Badge,
  ButtonGroup,
  Row,
  Container,
  Carousel
} from "react-bootstrap";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./css/inbox.css";

import { useState, useEffect } from "react";

export default function Inbox() {
  const [posts, setPosts] = useState([]);
  const [requestedPosts, setRequestedPosts] = useState([]);

  useEffect(() => {
        // Retrieve the "user" cookie
  const userCookie = Cookies.get('user');
  console.log(userCookie)

  // If the cookie exists, parse its value and retrieve the userID
  let userID;
  if (userCookie) {
    const user = JSON.parse(userCookie);
    userID = user.userID;
  }
  console.log(userID);
  fetch('http://localhost:3500/requestedBy/?users=' + userID)
  .then(response => response.json())
  .then(data => {
    console.log(data)

      fetch('http://localhost:3500/post')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setPosts(data)
        })
        .catch(error => console.error(error));

    setRequestedPosts(data) 
  })
  .catch(error => console.error(error));
}, []);

console.log(posts);
console.log(requestedPosts)

  const [postStates, setPostStates] = useState(posts.map(post => ({
    id: post.id,
    requestAccepted: post.requestAccepted
  })));

  // const matchedPosts = posts.filter(post => {
  //   return requestedPosts.some(reqPost => reqPost.postRequested === post.id);
  // });

  const matchedPosts = posts.filter(post => {
    const requestedPost = requestedPosts.find(reqPost => reqPost.postRequested === post.id);
    if (requestedPost) {
      return {
        ...post,
        requestedBy: requestedPost.requestedBy
      };
    }
  });

  console.log(matchedPosts)

  const handleAcceptRequest = (postId) => {
    // find the clicked post by its id
    const clickedPost = matchedPosts.find((post) => post.id === postId);
    // toggle the requestAccepted property of the clicked post
    const updatedPost = {
      ...clickedPost,
      requestAccepted: !clickedPost.requestAccepted,
    };
    // update the postStates state with the new post object
    const updatedPostStates = matchedPosts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPostStates(updatedPostStates);
  };

  return (
    <Container style={{ padding: "7rem 0" }}>
      <Col className="d-flex justify-content-center align-items-center flex-column">
        <h1>My Inbox</h1>
        {matchedPosts &&
          matchedPosts.map((matchedPost) => {
            console.log(matchedPost.id)
          
            return (
              <Card
              style={{
                width: "80%",
                margin: "0.5rem",
                boxShadow: "0px 0px 20px rgba(10, 10, 10, 0.05)",
              }}
            >
              <Row>
                <Col md={6}>
                    <Carousel className="carouselPost">
                    {matchedPost.photos.map(photo => (
                    <Carousel.Item key={photo}>
                        <img
                        className="d-block w-100"
                        src={photo}
                        alt="post photo"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                    </Carousel.Item>
                    ))}
                </Carousel>
                </Col>
    
                <Col md={6}>
                  <Card.Body style={{ paddingRight: "1.5rem", marginTop: "1vw" }}>
                    <Card.Subtitle>{matchedPost.title}</Card.Subtitle>
                    <Card.Title>£{matchedPost.price} pcm</Card.Title>
                    <Badge bg="success" style={{ margin: "0.5rem 0rem" }}>
                      Available
                    </Badge>
                    <Card.Subtitle>Postcode: {matchedPost.postcode}</Card.Subtitle>
                    <Card.Subtitle>City: {matchedPost.city}</Card.Subtitle>
                    <Card.Text className="mb-2 text-muted">Bedrooms: {matchedPost.beds} <br/>
                        Bathrooms: {matchedPost.bathrooms} <br/>
                    </Card.Text>
                    <Card.Text className="mb-2 text-muted">
                      Enlisted by: {matchedPost.authorID}
                    </Card.Text>
                    {/* {!matchedPost.requestAccepted && (
                    <ButtonGroup
                            style={{ float: "right", marginTop: "2rem" }}
                          >
                            
                            <Button
                              variant="success"
                              onClick={() => handleAcceptRequest(matchedPost.id)}
                            >
                              Accept Request
                            </Button>
                            <Button variant="danger">Decline Request</Button>
                          </ButtonGroup>
                    )} */}
                    {/* {matchedPost.requestAccepted && ( */}
                    <Link
                            to="/chat"
                            style={{ margin: "2rem 0.5rem 0 0", float: "right" }}
                          >
                            <Button variant="primary">Open Chat</Button>
                          </Link>
                    {/* )} */}
                  </Card.Body>
                </Col>
              </Row>
            </Card>
      


       
            );
          })}
      </Col>
    </Container>
  );
}
