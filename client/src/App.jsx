import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navb from "./components/Navbar";
import UNavbar from "./components/user/pages/UNavbar";
import Homepage from "./components/Homepage";
import Login from "./components/user/Login";
import VLogin from "./components/Volunteer/VLogin";
import Registration from "./components/user/registration";
import VRegistration from "./components/Volunteer/VRegistration";
import VNavbar from "./components/Volunteer/pages/VNavbar";
import VRegister from "./components/Volunteer/pages/VRegister";
import Applications from "./components/Volunteer/pages/Applications";
import VolunteerData from "./components/user/pages/volunteerData";
import ApplicationEdit from "./components/Volunteer/pages/ApplicationEdit";
import Profile from "./components/Volunteer/pages/profile";
import Changepassword from "./components/Volunteer/pages/changepassword";
import Review from "./components/user/pages/review";
import VolunteerReview from "./components/user/pages/VolunteerReview";
import './components/home.css';

function App() {
  const [role, setRole] = useState(() => localStorage.getItem("role"));

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  const handleLogout = () => {
    window.location.reload(true);
    setRole("null");
    localStorage.removeItem("role");
  };

  const handleVolunteerLogin = () => {
    setRole("Volunteer");
  };

  const handleUserLogin = () => {
    setRole("User");
  };
  return (
    <div>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

      <Router>
        {role==='null'&&<Navb setRole={setRole}/>}
        {role === "Volunteer" && (
            <VNavbar setRole={setRole} onLogout={handleLogout} />
          )}
          {role === "User" && (
            <UNavbar setRole={setRole} onLogout={handleLogout} />
          )}
      <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/VolunteerLogin' element={<VLogin setRole={handleVolunteerLogin}/>}/>
            <Route path='/Login' element={<Login setRole={handleUserLogin}/>}/>
            <Route path='/Registration' element={<Registration/>}/>
            <Route path='/VolunteerRegistration' element={<VRegistration/>}/>
            <Route path="/Register" element={<VRegister/>}/>
            <Route path="/Application" element={<Applications/>}/>
            <Route path="/Volunteer" element={<VolunteerData/>}/>
            <Route path="/edit/:id" element={<ApplicationEdit/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/Vchangep" element={<Changepassword/>}/>
            <Route path="/Volunteer/review/:id" element={<Review/>}/>
            <Route path="/Volunteer/Voreview/:id" element={<VolunteerReview/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
