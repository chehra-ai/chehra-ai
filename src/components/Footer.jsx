import React from "react";
import { Link } from "react-router-dom";
import classes from "styles/components/Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}><hr />< br />< br />
      <div className={classes.footerContent}>
        <div className={classes.linksSection}>
          <Link to="/about" className={classes.link}>About Us</Link>
          <Link to="/terms" className={classes.link}>Terms and Conditions</Link>
          <Link to="/privacy" className={classes.link}>Privacy Policy</Link>
          <Link to="/refund" className={classes.link}>Refund and Cancellation</Link>
          <Link to="/team" className={classes.link}>Team</Link>
          <Link to="/company" className={classes.link}>Company</Link>
          <Link to="/vision" className={classes.link}>Vision</Link>
          <Link to="/contact" className={classes.link}>Contact</Link>
        </div>
        <div className={classes.socialMediaSection}>
          <a href="https://www.linkedin.com/company/chehra-ai" className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a href="https://www.instagram.com/chehra.ai/" className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="https://www.youtube.com/@chehra-ai?sub_confirmation=1" className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-lg"></i>
          </a>
          <a href="https://www.facebook.com/ChehraAI/" className={classes.socialLink} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
        </div>
      </div>
      <div className={classes.footerBottom}>
        <p className={classes.footerText}>© 2024 SAHA AND JAIN INNOVATIVE TECH PRIVATE LIMITED. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
