import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Row, Col, Button, Carousel } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./css/post.css";
import Cookies from 'js-cookie';

export default function Post() {
  const { state } = useLocation();
  const [postRequested, setPostRequested] = useState(false);
  // const [userIsAuthor, setUserIsAuthor] = useState();

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

  console.log(state.authorID);
  // const {posts} = props;
  // console.log(state)

  const isAuthor = () => {
    return(userID==state.authorID);
  }

    const handleCancelRequest = () => {
      /*ADD BACKEND INTEGRATION*/
      setPostRequested(false);
    };

    const handleSendRequest = () => {
      /*ADD BACKEND INTEGRATION*/
      setPostRequested(true);
    };

    const handleSendReport = () => {
      /*ADD BACKEND INTEGRATION*/
      // Create Report
    };
   {/* {posts && posts.map(post => ( */}

    /*Displaying post*/
    return (
      <div className="postDiv">
         <Row className="postHeader">
           <Col sm={8} className="carouselColumn">
           <Carousel className="carouselPost">
             {state.photos.map(photo => (
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
           <Col sm={4} className="postDetails" >
             <h2 className="postTitle  ">{state.title}</h2>
             <h1 className="priceDisplay  ">£{state.price} pcm</h1>

             <h5 id="mutedText" className="textHeader">Author: {state.authorID}</h5>
             <h5 className="textHeader ">Porperty type: {state.type}</h5>
             <h5 className="textHeader ">Floor Area: {state.area} sq. ft.</h5>

             <h5 className="subTitle">Address Details:</h5>
             <p className="textHeader">
             {state.addressLine} <br/>
             Postcode: {state.postcode} <br/>
             City: {state.city} 
             </p>
             <div>
               {isAuthor() ? (
                 <Button variant="primary" 
                 style={{width:"180px", height: "50px"}}>
                   Edit Post
                 </Button>
               ) : postRequested ? (
                 <Button variant="outline-secondary" 
                 style={{width:"180px", height: "50px"}}
                 onClick={handleCancelRequest}>
                   Cancel request
                 </Button>
               ) : (
                 <Button variant="success" 
               style={{width:"180px", height: "50px"}}
                 onClick={handleSendRequest}>
                   Send request
                 </Button>
               )}
               <Button variant="danger" 
                 style={{width:"70px", height: "50px"}}
                 onClick={handleSendReport}>
                   Report
                 </Button>
             </div>
           </Col>
         </Row>
         <h5 className="subTitle">Description:</h5>
         <p className="mainText">{state.description}</p>

         <h5 className="subTitle">Additional details: </h5>
         <table className="details-table">
           <thead>
             <tr>
               <th>Details</th>
               <th>Value</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>Bedrooms count</td>
               <td>{state.beds}</td>
             </tr>
             <tr>
               <td>Bathrooms count</td>
               <td>{state.bathroomCount}</td>
             </tr>
             <tr>
               <td>Property condition</td>
               <td>{state.condition}</td>
             </tr>
             <tr>
               <td>Balcony</td>
               <td>{state.balconyExists ? (
                   <span>Yes</span>
                   ) : (
                   <span>No</span>
                   )}
               </td>
             </tr>
             <tr>
               <td>Parking</td>
               <td>{state.parkingExists ? (
                   <span>Yes</span>
                   ) : (
                   <span>No</span>
                   )}
               </td>
             </tr>
             <tr>
               <td>Pets are allowed</td>
               <td>{state.petAllowed ? (
                   <span>Yes</span>
                   ) : (
                   <span>No</span>
                   )}
                   </td>
             </tr>
             <tr>
               <td>Smoking is allowed</td>
               <td>{state.smokingAllowed ? (
                   <span>Yes</span>
                   ) : (
                   <span>No</span>
                   )}</td>
             </tr>
           </tbody>
         </table>
  
       </div>
    )
}

