import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/About.module.css";
import Footer from "components/Footer";

const About = () => {
  return (
    <div className={classes.about}>
      <Navigation /><br />
        <h2 className="text-white mb-small mt-medium">About Us</h2>
        <div className={classes.content}>
        <p className="text-white mb-small mt-medium">Legal business name: <span className="text-ter">SAHA AND JAIN INNOVATIVE TECH PRIVATE LIMITED</span>
        </p><p className="text-white mb-small mt-medium">Welcome to <span className="text-ter">Chehra.ai</span>, where we revolutionize the way you create and manage virtual influencers using cutting-edge AI technology. Our mission is to empower creators and businesses by providing tools that simplify and enhance the process of generating high-quality, engaging content.
        </p><p className="text-white mb-small mt-medium">At Chehra.ai, we understand the importance of authentic engagement in today's digital landscape. That's why we've developed an innovative platform that allows you to create, manage, and grow virtual influencers seamlessly. Whether you're a brand looking to expand your reach or a content creator aiming to diversify your portfolio, we've got you covered.
        </p> </div><Footer /></div>
  );
};

export default About;
