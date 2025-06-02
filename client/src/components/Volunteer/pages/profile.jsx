import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import img from "../../imgs/icons8-volunteer-64.png";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const [volunteer, setVolunteer] = useState({});
  const [review, setReview] = useState([]); // Initialize as array for reviews
  const navigate = useNavigate();
  const email = localStorage.getItem("Volunteer");
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== "Volunteer") {
      navigate("/");
    } else {
      fetchVolunteerData();
      fetchVolunteerReview();
    }
  }, []);

  const fetchVolunteerData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/Vol", {
        params: { email },
        headers: { 'Content-type': 'application/json' }
      });
      const volunteerData = response.data[0]; // Assuming the response is an array
      setVolunteer(volunteerData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchVolunteerReview = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/Vreview/${email}`, {
        headers: { 'Content-type': 'application/json' }
      });
      const reviewData = response.data;
      setReview(reviewData);
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={img}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1">Volunteer</p>
                <p className="text-muted mb-4">{volunteer.name}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn tag={Link} to="/Vchangep">Change Password</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{volunteer.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{volunteer.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{volunteer.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Date of Birth</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{volunteer.dob}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* Render reviews */}
        <MDBRow>
          <h3>Reviews</h3>
          {review.map((reviewItem, index) => (
            <MDBCol lg="4" key={index}>
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <h5>{reviewItem.userName}</h5>
                  <p>{reviewItem.reviewContent}</p>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Profile;
