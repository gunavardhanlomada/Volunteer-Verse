import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";


function VRegistration(){
    const [retypepass,setretypepass]=useState('');
    const [registrationdata, setregistrationdata] = useState({
        name:"",
        email:"",
        password:"",
        dob:"",
        phone:"",
        gender:"Male"
    });
    
    const navigate=useNavigate();

    const HandleRegistrationDataChange=(event)=>{
            const name=event.target.name;
            const value=event.target.value;
            setregistrationdata({...registrationdata, [name]:value });

    };

    const HandleRegistration=async (e)=>{
        e.preventDefault();
        const {name,email,password,dob,phone,gender}=registrationdata;
        if (registrationdata.password!==retypepass){
            alert("Password Mismatch");
        }
        else{
            try{
                const reply = await axios({
                    url: "http://localhost:8081/VRegister",
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    data: JSON.stringify({ name, email, password, dob, phone, gender }),
                });
            
                if (reply.status === 422) {
                    alert("User already exists");
                } else if (reply.status === 201) {
                    alert("Registration successful");
                    navigate("/");
                } else{
                    alert("Something Went Wrong")
                }
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }
    return(
        <div >
            <h3 style={{textAlign:'center'}}>Volunteer Registration</h3>
            <Form onSubmit={HandleRegistration}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={registrationdata.email} onChange={HandleRegistrationDataChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="string" placeholder="Enter Full Name" name='name' value={registrationdata.name} onChange={HandleRegistrationDataChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name='dob' value={registrationdata.dob} onChange={HandleRegistrationDataChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone No</Form.Label>
                    <Form.Control type="string" placeholder="Enter Phone No" name='phone' value={registrationdata.phone} onChange={HandleRegistrationDataChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" name='password' value={registrationdata.password} onChange={HandleRegistrationDataChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-type Password" name='retypepass' value={retypepass} onChange={(e) => setretypepass(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>

                    <div key={'inline-radio'} className="mb-3" value={registrationdata.gender} onChange={HandleRegistrationDataChange}>
                        <Form.Check inline label="Male " name="gender" type="radio" value="Female" defaultChecked/>
                        <Form.Check inline label="Female" name="gender" type="radio" value="Male"/>
                    </div>
                </Form.Group>
                <center>
                    <Button variant="primary" type="submit" style={{width:"350px"}}>
                        Submit
                    </Button>
                </center>
                <div style={{width:"350px",margin:"auto"}}>
                    <label>
                        <Form.Text className="text-muted">Already have Account : </Form.Text></label><Link to='/VolunteerLogin'>Click here</Link>
                </div>
            </Form>            
        </div>
    );
}
export default VRegistration;