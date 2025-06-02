import React, { useEffect, useState } from "react";
import img1 from './imgs/volunteer.jpg';
import img2 from './imgs/15cffb84be2ece7fb38074d5692dad52.jpg';
import img3 from './imgs/istockphoto-1303107115-612x612.jpg';
import Carousel from 'react-bootstrap/Carousel';
import AnimatedNumbers from "react-animated-numbers";
import axios from "axios";
import Faq from "react-faq-component";
import "./home.css";
import i1 from "./imgs/1.webp"
import i2 from "./imgs/2.webp"
import i3 from "./imgs/3.webp"
import i4 from "./imgs/4.webp"


function Homepage(){
    const [VC,setVC]=useState(0)
    const [VA,setVA]=useState(0)

    const textStyle = {
        fontsize: "72px",
        background: '-webkit-linear-gradient(rgb(18, 69, 89), rgb(5, 130, 202))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        Animation : "pop 5s"
      };

    const data ={
        title: "FAQ",
        rows: [
            {
                title: "What is Volunteer-Verse",
                content: `At Volunteer Verse, we believe in the power of community and collaboration. Our platform is dedicated to bridging the gap between volunteers and meaningful opportunities that align with their interests and skills. Whether you're a local shop looking for extra hands, a government agency responding to a natural disaster, or an event manager in of support, Volunteer Verse has got you covered.`,
            },
            {
                title: "How It Works",
                content:
                    "Volunteer Verse simplifies the process of finding and offering volunteer opportunities. Our intuitive platform allows users to browse through various volunteering options based on their interests, availability, and location. For businesses and organizations, posting volunteer opportunities is quick and easy, ensuring that you find the right individuals to support your cause.",
            },
            {
                title: "Why Volunteer Verse?",
                content: `<ul><li><b>Effortless Connection:</b> Seamlessly connect with volunteers who are passionate about making a difference in their community.</li><li>
                <b>Tailored Matching:</b> Our algorithm matches volunteers with opportunities that align with their skills and interests, creating meaningful and impactful experiences for both parties.</li><li>                
                <b>Diverse Network:</b> Join a diverse network of volunteers, businesses, and organizations dedicated to creating a positive impact in society. </li>`,
            },
        ],
    }

    const styles = {
        bgColor: '#f0f4ff',
        titleTextColor: "#3D4849",
        rowTitleColor: "#3D4849",
        // rowContentColor: 'grey',
        // arrowColor: "red",
    };
    
    const config = {
        animate: true,
        arrowIcon: "+"||"-",
        tabFocus: true
    };

    
    useEffect(()=>{
        Vcount()
      },[])

    useEffect(()=>{
        VApp()
    },[])
    const Vcount=()=>{
        axios.get("http://localhost:8081/VCount").then(async (Response)=>{
          const VCou =await Response.data
          setVC(VCou)
        })
    }
    
    const VApp=()=>{
        axios.get("http://localhost:8081/ACount").then(async (Response)=>{
          const VApplica =await Response.data
          setVA(VApplica)
        })
    }
    return(
        <div className="Homepage1">
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                    style={{height:'400px',width:'100%'}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                    style={{height:'400px',width:'100%'}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                    style={{height:'400px',width:'100%'}}
                    />
                </Carousel.Item>
            </Carousel>
            <br/>
            <center><h2 style={textStyle}>Welcome to Volunteer Verse - Connecting Volunteers with Opportunities</h2></center>
            <div class="row row-cols-1 row-cols-md-2 g-4 " style={{margin:"auto",width:"900px"}} >
            <div class="col" style={{textAlign:"center",width:"450px"}}>
                <div class="card text-bg-info" >
                <div class="card-body" style={{color:"#9c0b0b"}}>
                    <h5 class="card-title" style={{fontSize:"40px"}}>Total Volunteers</h5>
                    <center>
                    <p class="card-text" style={{width:"fit-content",fontSize:"30px"}}>
                        <AnimatedNumbers
                            includeComma
                            transitions={(index) => ({
                                type: "spring",
                                duration: index + 3,    
                            })}
                            animateToNumber={VC}
                        />
                    </p>
                    </center>
                </div>
                </div>
            </div>
            <div class="col" style={{textAlign:"center",width:"450px"}}>
                <div class="card text-bg-info" >
                <div class="card-body" style={{color:"#9c0b0b"}}>
                    <h5 class="card-title" style={{fontSize:"40px"}}>Total Applications</h5>
                    <p class="card-text">
                    <center>
                    <p class="card-text" style={{width:"fit-content",fontSize:"30px"}}>
                        <AnimatedNumbers
                            transitions={(index) => ({
                                type: "spring",
                                duration: index + 3,    
                            })}
                            animateToNumber={VA}
                        />
                    </p>
                    </center>
                    </p>
                </div>
                </div>
            </div>
            </div>

            <br/>

            <div>
                <div className="hero-section">
                    <div className="hero-content">
                        <h1>Empowering Change Through Volunteerism</h1>
                        <p>
                        At Volunteer Verse, we believe in the power of volunteerism to make a difference in the world.
                        Join our community of passionate volunteers and create positive change in your community.
                        </p>
                    </div>
                    <div className="hero-image">
                        <img src={i4} alt="Volunteer Group" />
                    </div>
                </div>
            </div>

            <div>
                <div className="services">
                    <h1>Our services</h1>
                    <div className="services-container">
                        <div className="service-card">
                        <img src={i1} alt="Community Outreach" />
                        <h2>Community Outreach</h2>
                        <p>
                            We believe in the power of community outreach programs to make a positive impact on our local communities.
                            Connect with us to join our various...
                        </p>
                        </div>
                        <div className="service-card">
                        <img src={i2} alt="Initiative Support" />
                        <h2>Initiative Support</h2>
                        <p>
                            We offer a range of support services to help local initiatives achieve their goals and make a positive
                            impact in our communities.
                        </p>
                        </div>
                        <div className="service-card">
                        <img src={i3} alt="Volunteer Connection" />
                        <h2>Volunteer Connection</h2>
                        <p>
                            Our platform connects passionate volunteers with local organizations and initiatives in their community.
                            Find the right volunteer opportunity for you and start making a difference...
                        </p>
                        </div>
                    </div>
                </div>
            </div>


            <div style={{width:"85%",margin:"auto"}}>
                <Faq
                    data={data}
                    styles={styles}
                    config={config}
                />
            </div>
            
            
        </div>
    )
}
export default Homepage;
