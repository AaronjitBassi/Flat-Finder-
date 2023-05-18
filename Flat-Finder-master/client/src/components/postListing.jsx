import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, ButtonGroup, Button, Row, Col, Carousel, Modal, ListGroup, Image } from 'react-bootstrap';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import Man from "../assets/businessman.jpg";
import { BsFillTelephoneFill, BsHouseUpFill } from "react-icons/bs";
import { FaSearchLocation } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { TiTick } from "react-icons/ti";

 // Retrieve the "user" cookie
 const userCookie = Cookies.get('user');
 console.log(userCookie)

 // If the cookie exists, parse its value and retrieve the userID
 let userID;
 if (userCookie) {
   const user = JSON.parse(userCookie);
   userID = user.userID;
 }
 


function PostListing(props) {

  //see info in console
  const { post } = props;
  // console.log(post);

  const [show, setShow] = useState(false);
  const [userIsAuthor, setUserIsAuthor] = useState(false);
  const [postRequested, setPostRequested] = useState(false);

  const [user, setUser] = useState(false);
  const [recipient, setRecipient] = useState(false);

  //handle sending request information
  const [request, setRequest] = useState();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancelRequest = () => {
      /*ADD BACKEND INTEGRATION*/
      setPostRequested(false);
    };

    const handleSendRequest = async (event) => {
      event.preventDefault();
      setPostRequested(true);
      // set the user which posted the thing to have recievedPosts
      // console.log(post.id)

      // //set which post it was requested for 
      // console.log(post.authorID)

      // //set the user which clicked to requestedPost
      // console.log(userID);
      
    try {
      const response = await fetch('http://localhost:3500/requestedBy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestedPosts: post.id, postRequested: post.authorID, recievedPosts: userID, requestAccepted: false}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        setUser(data);
      } else {
        console.error('Failed to create post:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }

    };

return (
    <Container style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="md"
          scrollable={true}
          keyboard={false}
          >
          <Modal.Header closeButton>
            <Modal.Title>Phil Mitchells</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Card
              style={{
                width: "95%",
                margin: "0.5rem",
                boxShadow: "0px 0px 20px rgba(10, 10, 10, 0.05)",
              }}
              >
                <Image
                src={Man}
                className='center'
                style={{
                  borderRadius: "100rem",
                  padding: "1rem"
                }}
              />
                <ListGroup variant="flush" className="border-0">
                <ListGroup.Item className="text-center border-0">
                  <Card.Title>Phil Mitchells</Card.Title>
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
                      {/* <b>Phone Number:</b>        */}
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
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      {/* })} */}

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
                {post.photos.map(photo => (
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
                <Card.Subtitle>{post.title}</Card.Subtitle>
                <Card.Title>£{post.price} pcm</Card.Title>
                <Badge bg="success" style={{ margin: "0.5rem 0rem" }}>
                  Available
                </Badge>
                <Card.Subtitle>Postcode: {post.postcode}</Card.Subtitle>
                <Card.Subtitle>City: {post.city}</Card.Subtitle>
                <Card.Text className="mb-2 text-muted">Bedrooms: {post.beds} <br/>
                    Bathrooms: {post.bathrooms} <br/>
                </Card.Text>
                <Card.Text className="mb-2 text-muted">
                  Enlisted by: {post.authorID}
                </Card.Text>
                <span style={{ display: "inline-block" }}>
                  
                  {userIsAuthor ? ( 
                     
                    <div>
                      <ButtonGroup>
                      <Button
                      variant="primary"
                      style={{ marginRight: "0", marginTop: "3vw" }}
                      >
                        <Link to={{pathname: '/post'}} 
                    state={{ title: post.title, 
                      price: post.price, 
                      photos: post.photos,
                      city: post.city,
                      postcode: post.postcode,
                      bathroomCount: post.bathrooms,
                      beds: post.beds,
                      authorID: post.authorID,
                      addressLine: post.addressLine,
                      area: post.area,
                      balconyExists: post.balconyExists,
                      condition: post.condition,
                      description: post.description,
                      petAllowed: post.petAllowed,
                      smokingAllowed: post.smokingAllowed,
                      parkingExists: post.parkingExists,
                      type: post.type,
                      datetime: post.datetime}}>Go to Post</Link>
                      </Button> 
                      <Button
                      variant="outline-primary"
                      style={{ marginRight: "2vw", marginTop: "3vw" }}
                      >
                      View Requests
                      </Button>
                      </ButtonGroup>
                      <Button
                        variant="success"
                        style={{ float: "right", marginTop: "3vw" }}
                      >
                        Edit post
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <ButtonGroup>
                        <Button
                          variant="primary"
                          style={{ marginRight: "0", marginTop: "3vw" }}
                          onClick={handleShow}
                        >
                          Author Details
                        </Button>
                        <Button
                          variant="outline-primary"
                          style={{ marginRight: "2vw", marginTop: "3vw" }}
                        >
                           <Link to={{pathname: '/post'}} 
                    state={{ title: post.title, 
                      price: post.price, 
                      photos: post.photos,
                      city: post.city,
                      postcode: post.postcode,
                      bathroomCount: post.bathrooms,
                      beds: post.beds,
                      authorID: post.authorID,
                      addressLine: post.addressLine,
                      area: post.area,
                      balconyExists: post.balconyExists,
                      condition: post.condition,
                      description: post.description,
                      petAllowed: post.petAllowed,
                      smokingAllowed: post.smokingAllowed,
                      parkingExists: post.parkingExists,
                      type: post.type,
                      datetime: post.datetime}}>Go to Post</Link>
                        </Button>
                      </ButtonGroup>
                      {postRequested ? (
                        <Button variant="outline-secondary" 
                        style={{ float: "right", marginTop: "3vw" }}
                        onClick={handleCancelRequest}>
                          Cancel request
                        </Button>
                      ) : (
                        <Button variant="success" 
                        style={{ float: "right", marginTop: "3vw" }}
                        onClick={handleSendRequest}>
                          Send request
                        </Button>)}
                    </div>
                  )
                  }
                </span>
              </Card.Body>
            </Col>
          </Row>
        </Card>
    </Container>
  );
}

export default PostListing;
