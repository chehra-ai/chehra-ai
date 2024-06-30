import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/About.module.css";
import Footer from "components/Footer";

const Team = () => {
  return (
    <div className={classes.about}>
      <Navigation /><br />
      <h2 className="text-white mb-small mt-medium">Our Team</h2>
      <div className={classes.content}>
        <p className="text-white mb-small mt-medium">
          At Chehra.AI, we are proud to have a team of dedicated and passionate individuals who are committed to revolutionizing the way you create and manage virtual influencers.
        </p>

        <div className={classes.teamMember}>
            <h3 className="text-white mb-small mt-medium">Divyansh Jain - <b className="text-ter">CEO</b></h3>
          <img src="divyansh.jpg" alt="Divyansh Jain" className={classes.memberImage} />
          <div className={classes.memberInfo}>
            <p className="text-white mb-small mt-medium">
              Divyansh is a 16 year old <b className="text-ter">11th Standard PCM Student</b> who is the visionary behind the company. He has a deep interest in technology and started coding when he was 12 years old. He has made several projects, and worked with 2 startups. He dreams to build the first quantum computer of India, with AI Capabilities. He is also preparing for the JEE Advanced competition.
            </p>
            <p className="text-white mb-small mt-medium">
              <a href="https://www.linkedin.com/in/annie-bhaiya/" className="text-ter">LinkedIn</a> | 
              <a href="https://www.instagram.com/annie.bhaiya/" className="text-ter"> Instagram</a> | 
              <a href="https://www.youtube.com/@Annie-Bhaiya" className="text-ter"> YouTube</a> | 
            Email: <a href="mailto:divyansh@chehra.ai" className="text-ter">divyansh@chehra.ai</a></p>
          </div>
        </div>

        <div className={classes.teamMember}>
            <h3 className="text-white mb-small mt-medium">Aditya Saha - <b className="text-ter">CFO</b></h3>
          <img src="aditya.png" alt="Aditya Saha" className={classes.memberImage} />
          <div className={classes.memberInfo}>
            <p className="text-white mb-small mt-medium">
              Aditya is a 20 year old <b className="text-ter">B.Tech Computer Science Engineering</b> student in J.C. Bose University of Science and Technology, New Delhi. He is a visionary and has a deep mind when it comes to business and finance. He has a very linear and genius approach towards solving problems. He is also a tech enthusiast just like Divyansh, and envisions a world where Tehcnology and spirituality will go hand in hand.
            </p>
            <p className="text-white mb-small mt-medium">
              <a href="https://www.linkedin.com/in/aditya-saha-a71b4a2b7/" className="text-ter">LinkedIn</a> | 
              Email: <a href="mailto:aditya@chehra.ai" className="text-ter">aditya@chehra.ai</a>
            </p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Team;
