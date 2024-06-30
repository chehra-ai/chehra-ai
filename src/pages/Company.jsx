import React from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/About.module.css";
import Footer from "components/Footer";

const Company = () => {
  return (
    <div className={classes.about}>
      <Navigation /><br />
      <h2 className="text-white mb-small mt-medium">Company</h2>
      <div className={classes.content}>
        <p className="text-white mb-small mt-medium">
          Welcome to SAHA AND JAIN INNOVATIVE TECH PRIVATE LIMITED, the parent company of Chehra.AI. Our company was founded with the vision to leverage AI technology to create innovative solutions that empower creators and businesses alike.
        </p>
        <p className="text-white mb-small mt-medium">
          Incorporated on 11th June 2024, we have rapidly grown to become a leading name in the AI-driven content creation industry. Our team of experts is dedicated to providing tools that simplify and enhance the process of generating high-quality, engaging content.
        </p>
        <p className="text-white mb-small mt-medium">
          At SAHA AND JAIN INNOVATIVE TECH PRIVATE LIMITED, we believe in the power of technology to transform the way we interact with the digital world. Join us on our journey to shape the future of virtual influencers and beyond.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Company;
