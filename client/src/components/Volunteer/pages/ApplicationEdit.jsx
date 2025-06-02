import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

function ApplicationEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [editData, setEditData] = useState({
        name: '',
        age: '',
        phone: '',
        address: '',
        interest: ''
    });


    useEffect(()=>{
        fetchApplicationData();
    },[id]);

    const HandleRegistrationDataChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setEditData({...editData, [name]:value });

    };

    const fetchApplicationData = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/IVDatabyId/${id}`);
          setEditData(response.data);
        } catch (error) {
          console.log('Error fetching application data:', error);
        }
      };

      const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:8081/AEdit/${id}`, editData);
          alert('Updated successfully');
          navigate('/Application');
        } catch (error) {
          console.error('Error updating application:', error);
        }
      };

  return (
    <div>
        <div className="container pt-4" style={{width:'30%'}}>
                <h3 style={{textAlign:'left',marginLeft:'45px'}}>Volunteer Application</h3>
                <Form onSubmit={handleEditSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="string" placeholder="Enter Full Name" name='name' value={editData.name} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="age" name='age' value={editData.age} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone No</Form.Label>
                        <Form.Control type="string" placeholder="Enter Phone No" name='phone' value={editData.phone} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="string" placeholder="Enter Address" name='address' value={editData.address} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Volunteer Interest</Form.Label>
                        <Form.Control type="string" placeholder="Like for hepling in library or for flood etc." name='interest' value={editData.interest} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>
                    <center>
                        <Button variant="primary" type="submit" style={{width:"350px"}}>
                            Submit
                        </Button>
                    </center>
                </Form>
            </div>
    </div>
  )
}

export default ApplicationEdit