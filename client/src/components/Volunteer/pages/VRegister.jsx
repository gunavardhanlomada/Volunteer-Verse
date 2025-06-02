import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


function VRegister(){

    const [registrationdata, setregistrationdata] = useState({
        name:"",
        age:"",
        phone:"",
        address:"",
        interest:""
    });
    

    const navigate=useNavigate();
    const email = localStorage.Volunteer
    const role = localStorage.getItem('role')



    const HandleRegistrationDataChange=(event)=>{
            const name=event.target.name;
            const value=event.target.value;
            setregistrationdata({...registrationdata, [name]:value });

    };

    const HandleRegistration=async (e)=>{
        e.preventDefault();
        const {name,age,phone,address,interest}=registrationdata;
        try{
            const reply = await axios({
                url: "http://localhost:8081/VApplication",
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                data: JSON.stringify({email,name,age,phone,address,interest}),
            });

            if (reply.status === 201) {
                alert("Registration successful");
                navigate("/");
            } else{
                alert("Something Went Wrong")
            }
        }
        catch (error) {
            console.error(error.message);
        }
        if (role!=="Volunteer"){
            navigate("/")
          }
    }
    return(
        <div>
            <div className="container pt-4" style={{width:'30%'}}>
                <h3 style={{textAlign:'left',marginLeft:'45px'}}>Volunteer Application</h3>
                <Form onSubmit={HandleRegistration}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="string" placeholder="Enter Full Name" name='name' value={registrationdata.name} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="age" name='age' value={registrationdata.age} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone No</Form.Label>
                        <Form.Control type="string" placeholder="Enter Phone No" name='phone' value={registrationdata.phone} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="string" placeholder="Enter Address" name='address' value={registrationdata.address} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Volunteer Interest</Form.Label>
                        <Form.Control type="string" placeholder="Like for hepling in library or for flood etc." name='interest' value={registrationdata.interest} onChange={HandleRegistrationDataChange}/>
                    </Form.Group>
                    <center>
                        <Button variant="primary" type="submit" style={{width:"350px"}}>
                            Submit
                        </Button>
                    </center>
                </Form>
            </div>
        </div>
    );
}
export default VRegister;