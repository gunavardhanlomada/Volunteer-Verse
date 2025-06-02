import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Changepassword() {
    const [retypepassword, setRetype] = useState('');
    const [editData, setEditData] = useState({
        oldpassword: '',
        newpassword: '',
    });

    const navigate = useNavigate();
    const user = localStorage.getItem("Volunteer");

    const handleDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditData({ ...editData, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.put('http://localhost:8081/updatePassword', {
                    email: user,
                    oldpassword: editData.oldpassword,
                    newpassword: editData.newpassword
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert('Password changed successfully');
                navigate("/profile")
            } catch (error) {
                console.error('Error updating password:', error);
                alert('Failed to change password. Please try again.');
            }
        }
    }

    const validate = () => {
        if (editData.newpassword === retypepassword) {
            return true;
        } else {
            alert("Password Mismatch");
            return false;
        }
    }

    return (
        <div className="container pt-4" style={{ width: '30%' }}>
            <h3 style={{ textAlign: 'left', marginLeft: '45px' }}>Change Password</h3>
            <Form onSubmit={handleEditSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Old Password"
                        name="oldpassword"
                        value={editData.oldpassword}
                        onChange={handleDataChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="New Password"
                        name="newpassword"
                        value={editData.newpassword}
                        onChange={handleDataChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Re-type Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Re-Type new Password"
                        value={retypepassword}
                        onChange={(e) => setRetype(e.target.value)}
                    />
                </Form.Group>
                <center>
                    <Button variant="primary" type="submit" style={{ width: "350px" }}>
                        Submit
                    </Button>
                </center>
            </Form>
        </div>
    )
}

export default Changepassword;
