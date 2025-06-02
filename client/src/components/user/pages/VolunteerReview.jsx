import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import axios from 'axios';

function VolunteerReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState([]); // Initialize as array for reviews

  useEffect(() => {
    fetchVolunteerReview();
  }, [id]);

  const fetchVolunteerReview = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/Vreview/${id}`, {
        headers: { 'Content-type': 'application/json' }
      });
      const reviewData = response.data;
      setReview(reviewData);
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}>
        <h3>Reviews</h3>
        <MDBContainer className="py-5">
          <MDBRow>
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
    </div>
  );
}

export default VolunteerReview;
