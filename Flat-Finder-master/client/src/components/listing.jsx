import {
  Card,
  Button,
  Col,
  Badge,
  Carousel,
  ListGroup,
  Row,
  Container,
  Modal,
  Image,
  Dropdown,
  ButtonGroup,
  Form,
  Nav,
  NavDropdown
} from "react-bootstrap";

import { Link } from "react-router-dom";
import PostListing from "./postListing";

import { useState, useEffect } from "react";
//import assets
import Image1 from "../assets/imagetest.jpg";
import Image2 from "../assets/imagetest.jpg";
import Image3 from "../assets/imagetest.jpg";
import Man from "../assets/businessman.jpg";
import bannerImage from "../assets/apartment.jpg";



//make this dynamic with data input

export default function Listing() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const backgroundBanner = {
    background: `url(${bannerImage}), rgba(112, 128, 4, 0.3)`,
    // backgroundImage: `url(${bannerImage})`,
    // backgroundColor: "rgba(112, 128, 4)",
    // filter: "brightness(0.4)",
    backgroundSize: "cover",
    padding: "10rem",
    // position: "absolute",
    backgroundPosition: "center",
    top: 0,
    width: "150%",
    height: "20vh",
    zIndex: "-5",
  };

  const [allPosts, setAllPosts] = useState([]);

  function handleSearch(e){
    e.preventDefault();
    const searchArea = document.querySelector('input[type="search"]').value; 
    if (searchArea === '') {
      setPosts(allPosts);
    }
    else{
      const filteredData = filterByCity(allPosts, searchArea)
      setPosts(filteredData)
    } 
  }

  function filterByCity(data, city){
    setPosts(allPosts)
    return data.filter(post => post.city.toLowerCase() === city.toLowerCase());
  }
// for flask integration
// useEffect(() => {
//   fetch('/getPosts')
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Network res prob');
//     })
//     .then(postList => {
//       // console.log(posts);
//       setPosts(postList);
//     })
//     .catch(error => {
//       console.error('prob:', error);
//     });
// }, []);

//for JSON-Server integration
const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3500/post')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAllPosts(data)
        setPosts(data)
      })
      .catch(error => console.error(error));
  }, []);

console.log(posts);
  const filter = (e) => {

  //    useEffect(() => {
  //     fetch('http://localhost:3500/post?postID=1')
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log("hello")
  //         console.log(data)
  //         if (data)
  //         setPosts(data) 
  //       })
  //       .catch(error => console.error(error));
  //   }, []);
  }

// console.log(posts);

  //add modal to enlarge and show the properties details
  return (
    <Container style={{ padding: "0 0 7rem 0" }}>
      <Col className="center">
        <div style={backgroundBanner} className="center">
          <h1 className="text-white" style={{filter: "brightness(1)", textShadow: "0px 0px 20px rgba(0,0,0,0.4)"}}>Property to rent in London</h1>
          <h4 className="text-white" style={{filter: "brightness(1)", textShadow: "0px 0px 20px rgba(0,0,0,0.4)"}}>Results found: {posts.length}</h4>
        </div>
        <Form className="d-flex m-3" style={{ width: "60%" }} onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                size="lg"
                placeholder="Search by City"
                aria-label="Search"
              />
          <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
        <Nav className="justify-content-center" style={{borderRadius: "5px", margin: "1rem", border: "1px solid #ced4da"}}>
       
        <NavDropdown className="listing-container" title="Preferences" id="dropdown-preferences">
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="Pets" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="Smoking" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="Flatmates" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown className="listing-container" title="Price (£ PCM)" id="dropdown-price">
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="0 - 1000pcm" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="1000pcm - 3000pcm" onClick={(e) => e.stopPropagation()}/>
            </Form>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="3000pcm+" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown className="listing-container" title="Area" id="dropdown-area">
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="London" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="Brighton" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="Manchester" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown className="listing-container" title="Property Type" id="dropdown-property-type">
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="Flat" onClick={(e) => e.stopPropagation()}/>
            </Form>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="Semi-Detached House" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Form>
              <Form.Check type="checkbox" label="Terraced House" onClick={(e) => e.stopPropagation()} />
            </Form>
          </NavDropdown.Item>
        </NavDropdown>
    </Nav>
        {posts && posts.map(post => (
      <PostListing key={post.ID} post={post} />
    ))}
      </Col>
    </Container>
  );
}
