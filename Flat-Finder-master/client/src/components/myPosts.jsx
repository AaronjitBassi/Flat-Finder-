import React, { useState, useEffect} from 'react';
import { Button, Container } from 'react-bootstrap';
import PostListing from './postListing';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';

function MyPosts() {
  const [posts, setPosts] = useState([]);
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
    fetch('http://localhost:3500/post/?authorID=' + userID)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setPosts(data) 
      })
      .catch(error => console.error(error));
  }, []);
  
  return (
    <Container>
      <div style={{display: "flex", justifyContent:"right"}}>
        <Button variant="primary" style={{margin: "3% 1% 1% 1%", padding: "1.5%"}}>
          <Link to="/createPost" style={{ color: '#FFF' }}><span>Add a new property</span></Link>
        </Button>
      </div>
      
        <h1 style={{paddingTop: "1%", fontSize: "2em", textAlign: "center"}}>My Properties</h1>
        {posts.map(post => (
        <PostListing key={post.ID} post={post}/>
      ))}
    </Container>
  );
}

export default MyPosts;

