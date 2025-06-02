import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Applications() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const navigate=useNavigate();

  const email = localStorage.getItem('Volunteer');
  const role = localStorage.getItem('role')

  useEffect(() => {
    fetchVolunteerData();
  }, [email]);

  const fetchVolunteerData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/IVData", {
        params: { email },
        headers: { 'Content-type': 'application/json' }
      });
      setData(response.data);
    } catch (error) {
      console.error(error.message);
    }
    if (role!=="Volunteer"){
      navigate("/")
    }
  };

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8081/ADelete/${id}`);
      alert('Deleted successfully');
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filter = (item) => {
    const searchTerm = search.toLowerCase();
    return (
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm) ||
      item.address.toLowerCase().includes(searchTerm) ||
      item.interest.toLowerCase().includes(searchTerm)
    );
  };

  return (
    <div>
      <br />
      <br />
      <div style={{ width: "950px", margin: "auto" }}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table striped bordered hover style={{ width: "950px", margin: "auto", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone no</th>
            <th>Address</th>
            <th>Interest</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(filter).map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.interest}</td>
              <td>
                <Link to={`/edit/${item._id}`} style={{ color: "blue" }}>
                  <u>Edit</u>
                </Link>
                <button
                  style={{ color: "blue", marginLeft: "10px",border:"0px" }}
                  onClick={() => deleteApplication(item._id)}
                >
                  <u>Delete</u>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Applications;
