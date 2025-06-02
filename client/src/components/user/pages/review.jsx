import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

function Review() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState("");

  const user = localStorage.getItem("User");
  const uname = localStorage.getItem("UName");
  const role = localStorage.getItem("role");

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (role !== "User") {
      navigate("/");
      return;
    }

    const userId = user;
    const userName = uname;
    const reviewContent = review;
    const volunteer = id;

    try {
      const reply = await axios.post("http://localhost:8081/review", {
        userId,
        userName,
        reviewContent,
        volunteer
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (reply.status === 201) {
        alert("Review submitted successfully");
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };

  return (
    <div>
      <div className="container pt-4" style={{ width: '30%' }}>
        <Form onSubmit={handleEditSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Write a Review</Form.Label>
            <InputGroup>
              <Form.Control
                as="textarea"
                placeholder="Write a review"
                name="name"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                style={{ height: "100px" }}
              />
            </InputGroup>
          </Form.Group>
          <center>
            <Button variant="primary" type="submit" style={{ width: "350px" }}>
              Submit
            </Button>
          </center>
        </Form>
      </div>
    </div>
  );
}

export default Review;
