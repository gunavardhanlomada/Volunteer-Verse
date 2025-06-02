import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Applications(){

  const [data,setdata]= useState([])
  const [search,setsearch]=useState('')
  const role = localStorage.getItem('role')
  const navigate=useNavigate();

  useEffect(()=>{
    Volunteerdata()
  },[])

  const Volunteerdata=()=>{
    axios.get("http://localhost:8081/VData").then(async (Response)=>{
      const Application =await Response.data
      setdata(Application)
    })
    if (role !== "User"){
      navigate("/")
    }
  }

  const filter=(item)=>{
    return search.toLowerCase()===""?item:item.name.toLowerCase().includes(search)||item.address.toLowerCase().includes(search)||item.interest.toLowerCase().includes(search)
  }
  
  return(
    <div>
      <br/>
      <div style={{width:"950px",margin:"auto"}}>
      <input type="string" placeholder="Search" value={search} onChange={(e)=>setsearch(e.target.value)}/>
      </div>
      <Table striped bordered hover style={{width:"950px",margin:"auto",marginTop:"50px"}}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone no</th>
            <th>Address</th>
            <th>Interest</th>
          </tr>
        </thead>
        <tbody>
          {
            data.filter(filter).map((item,index)=> {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.interest}</td>
                  <td>
                    <Link to={`review/${item.email}`}>Review  </Link>
                    <u><Link to={`Voreview/${item.email}`}>  View Review</Link></u>
                    </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}
export default Applications;
