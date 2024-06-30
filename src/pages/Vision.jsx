import React from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/About.module.css";
import Footer from "components/Footer";

const Vision = () => {
  return (
    <div className={classes.about}>
      <Navigation /><br />
      <h2 className="text-white mb-small mt-medium">Our Vision</h2>
      <div className={classes.content}>
        <p className="text-white mb-small mt-medium">
          At Chehra.AI, our vision is to revolutionize the way people create and interact with digital content. We aim to provide a comprehensive platform that empowers users to generate and manage virtual influencers with ease and creativity.
        </p>
        <p className="text-white mb-small mt-medium">
          Starting with AI-generated images and influencers, we are committed to expanding our offerings to include tools for writing captions, creating LinkedIn posts, and introducing chat options. Our ultimate goal is to venture into video generation and establish a complete social media platform dedicated to virtual influencers.
        </p>
        <p className="text-white mb-small mt-medium">
          We believe in the potential of virtual influencers to bridge the gap between brands and their audiences, fostering authentic engagement in the digital age. Our long-term vision is to build a vibrant community where virtual influencers thrive, connecting people and ideas in innovative ways.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Vision;
