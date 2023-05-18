import { useState } from "react";
import { Container, Form, Button, Row, Col} from "react-bootstrap";
import Cookies from "js-cookie";
import "./css/createPost.css";

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

const defaultPost = {
 id: null,
 dateTime: '',
 authorID: userID,
 title: '',
 description: '',
 type: '',
 price: null,
 area: null,
 city: '',
 postcode: '',
 addressLine: '',
 photos: [],
 beds: null,
 condition: '',
 bathrooms: null,
 petAllowed: false,
 smokingAllowed: false,
 balconyExists: false,
 parkingExists: false,
}


export default function CreatePost() {
  const [post, setPost] = useState(defaultPost);

  //Allowing submission of the form only when the required fields are filled. 
  const isFormValid = (post.title!== '' && post.type !== '' && post.price !== 0
    && post.city !== '' && post.postcode !== '' && post.beds !== 0 );


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(post)
    try {
      const response = await fetch('http://localhost:3500/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Post created successfully:', data);
        setPost(defaultPost);
        //redirect
        history.push('./myPosts');
      } else {
        console.error('Failed to create post:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  //Image upload
  const handleFileSelect = (event) => {
    const photos = Array.from(event.target.files);
    setPost({...post, photos : photos})
  };

  const handleSubmitPhotos = async (event) => {
    // event.preventDefault();
    // const formData = new FormData();
    // photos.forEach((photo, index) => {
    //   formData.append(`photo_${index}`, photo);
    // });
    // try {
    //   const response = await fetch("/api/upload-photos", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   if (response.ok) {
    //     // Handle successful response from the backend
    //     setPost({...post, photos: []});
    //   } else {
    //     // Handle error response from the backend
    //     console.error(response);
    //   }
    // } catch (error) {
    //   // Handle network error or other exceptions
    //   console.error(error);
    // }
  };

  return (
    <div id="createPostPage">
    <Container id="createPostContainer">
      <h1 id="addPropertyTitle">Add a new property</h1>
      <div id="createPostForm">
        <Form id="form" onSubmit={handleSubmit}>
          <p style={{fontSize: "1em", fontStyle: "italic" }}> <span style={{color: "red"}}>*</span> - required fields</p>
          <input type="hidden" name="datetime" value={new Date().toLocaleString() + ""}></input>
          <input type="hidden" name="authorID" value={
            JSON.parse(Cookies.get('user')).userID}></input>
          <Form.Group controlId="title" >
          <span style={{fontSize: "1.1em", fontStyle: "italic" }}>Enter Post Title</span>
          <span style={{color: "red"}}>*</span>
            <Form.Control id="titleInput"
              type="text" 
              placeholder="Title"
              value={post.title}
              onChange={(e) => setPost({...post, title : e.target.value})}
            />
          </Form.Group>

          <Form.Group controlId="description" id="formDescrition">
            <Form.Label className="label">About the property</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Property Description..."
              value={post.description}
              onChange={(e) => setPost({...post, description : e.target.value})}
            />
          </Form.Group>

          <Form.Group controlId="type" id="formType">
            <Form.Label className="label">Property Type</Form.Label>
            <span style={{color: "red"}}>*</span>
            <div className="dropdown">
              <select value={post.type} onChange={(e) => setPost({...post, type: e.target.value })} >
                <option value="" disabled selected>
                  Choose...
                </option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Room">Room</option>
              </select>
            </div>
          </Form.Group>

          <Form.Group controlId="price" style={{ maxWidth: 400 }}>
            <div className="d-flex align-items-center">
              <Form.Label className="label mr-2 detailsLabels">Price<span style={{color: "red"}}>*</span> : </Form.Label>
              <div className="d-flex flex-grow-1">
                <Form.Control
                  type="text"
                  placeholder="0.00"
                  value={post.price}
                  onChange={(e) => setPost({...post, price : e.target.value})}
                  className="mr-2 flex-grow-1"
                />
              </div>
              <Form.Label className="label endLabel">£ pcm</Form.Label>
            </div>
          </Form.Group>

          <Form.Group controlId="area" style={{ maxWidth: 400 }}>
            <div className="d-flex align-items-center">
              <Form.Label className="label mr-2 detailsLabels">Floor Area : </Form.Label>
              <div className="d-flex flex-grow-1">
                <Form.Control
                  type="text"
                  placeholder="100.00"
                  value={post.area}
                  onChange={(e) => setPost({...post, area : e.target.value})}
                  className="mr-2 flex-grow-1"
                />
              </div>
              <Form.Label className="label endLabel">sq. ft.</Form.Label>
            </div>
          </Form.Group>

          <Form.Group controlId="bedCount" style={{ maxWidth: 400 }}>
            <div className="d-flex align-items-center">
              <Form.Label className="label detailsLabels">Number of Bedrooms<span style={{color: "red"}}>*</span> </Form.Label>
              <div className="d-flex flex-grow-1">
                <Form.Control
                  type="text"
                  placeholder="2"
                  value={post.beds}
                  onChange={(e) => setPost({...post, beds : e.target.value})}
                  className="mr-2 flex-grow-1"
                />
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="addressDetails">
            <Form.Label className="subTitle d-block">Enter Address Details</Form.Label>
            <div className="row">
              <div className="col">
                <Form.Label className="label">City</Form.Label>
                <span style={{color: "red"}}>*</span>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={post.city}
                  onChange={(e) => setPost({...post, city : e.target.value})}
                />
              </div>
              <div className="col">
                <Form.Label className="label">Postcode</Form.Label>
                <span style={{color: "red"}}>*</span>
                <Form.Control
                  type="text"
                  placeholder="Postcode"
                  value={post.postcode}
                  onChange={(e) => setPost({...post, postcode : e.target.value})}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <Form.Label className="label">Address Line</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address Line"
                  value={post.addressLine}
                  onChange={(e) => setPost({...post, addressLine : e.target.value})}
                />
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="photosUpload">
            <Form.Label className="subTitle">
              Upload Property Photos 
            </Form.Label>
            <Row>
              <Col md={{ span: 6 }}>
                <Form onSubmit={handleSubmitPhotos}>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!post.photos.length}
                  >
                    Upload
                  </Button>
                </Form>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="Details">
            <Form.Label className="subTitle">Extra details</Form.Label>

            <Form.Group>
              <Form.Label className="label detailsLabels">Condition</Form.Label>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${
                    post.condition === "new"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setPost({...post, condition : "new"})}
                >
                  New
                </button>
                <button
                  type="button"
                  className={`btn ${
                    post.condition === "old"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setPost({...post, condition  : "old"})}
                >
                  Old
                </button>
              </div>
            </Form.Group>

            <Form.Group controlId="bathrooms">
              <Form.Label className="label detailsLabels">Bathrooms</Form.Label>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${
                    post.bathrooms === "1"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setPost({...post, bathrooms : "1"})}
                >
                  1
                </button>
                <button
                  type="button"
                  className={`btn ${
                    post.bathrooms === "2"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setPost({...post, bathrooms : "2"})}
                >
                  2
                </button>
                <button
                  type="button"
                  className={`btn ${
                    post.bathrooms === "3"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setPost({...post, bathrooms : "3"})}
                >
                  3
                </button>
                <button
                  type="button"
                  className={`btn ${
                    post.bathrooms === "3+"
                      ? "btn-secondary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setPost({...post, bathrooms : "3+"})}
                >
                  3+
                </button>
              </div>
            </Form.Group>

            <Form.Group id="formChecks">
              <Form.Check
                className="checkbox"
                type="checkbox"
                id="parking"
                label="Parking"
                onChange={(e) => setPost({...post, hasParking : e.target.checked})}
              />
              <Form.Check
                className="checkbox"
                type="checkbox"
                id="balcony"
                label="Balcony"
                onChange={(e) => setPost({...post, hasBalcony : e.target.checked})}
              />
              <Form.Check
                className="checkbox"
                type="checkbox"
                id="smoking-friendly"
                label="Smoking-friendly"
                onChange={(e) => setPost({...post, smokingFriendly : e.target.checked})}
              />
              <Form.Check
                className="checkbox"
                type="checkbox"
                id="pet-friendly"
                label="Pet-friendly"
                onChange={(e) => setPost({...post, petFriendly : e.target.checked})}
              />
            </Form.Group>
          </Form.Group>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button id="submitBtn" variant="success" type="submit" disabled={!isFormValid}>
              Post the property
            </Button>
          </div>

        </Form>
      </div>
    </Container>
    </div>
  );
}
