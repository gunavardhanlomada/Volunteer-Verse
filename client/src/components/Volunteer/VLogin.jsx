import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
function VLogin({ setRole }) {

    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate();
        useEffect(()=>{
            },[])
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch("http://localhost:8081/VLogin", {
                    method: "POST",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (data === "User not found"){
                    alert("User not found")
                }
                else if (data === "Incorrect Password"){
                    alert("Incorrect Password")
                }
                else if (data.email !== null){
                    setRole("Volunteer");
                    navigate('/');
                    localStorage.setItem("Volunteer",data.email)
                }
                else{
                    alert("Something Went Wrong")
                }
        } catch (error) {
            console.error("Error:", error.message);
        }     
    };

  return (
    <div>
    <Form onSubmit={handleSubmit}>
        <h3 style={{textAlign:'center',marginTop:"50px"}}>Volunteer Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={(e)=>setUsername(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <center>
        <Button variant="primary" type="submit" style={{width:"350px"}}>
            Submit
        </Button>
        </center>
        <div style={{width:"350px",margin:"auto"}}>
            <label>
            <Form.Text className="text-muted">Dont have Account :</Form.Text></label><Link to='/VolunteerRegistration'>Click here</Link>
        </div>
    </Form>
    </div>
  );
}

export default VLogin;