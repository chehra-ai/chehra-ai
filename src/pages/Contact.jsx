import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/About.module.css";
import Footer from "components/Footer";

const Contact = () => {
  return (
    <div className={classes.about}>
      <Navigation /><br />
      <h2 className="text-white mb-small mt-medium">Contact Us</h2>
      <div className={classes.content}>
        <p className="text-white mb-small mt-medium">
          We value your feedback and inquiries. Whether you have questions about our platform, need assistance, or just want to share your thoughts, we are here to listen and help.
        </p>
        <p className="text-white mb-small mt-medium">
          <strong>Email:</strong> <a href="mailto:divyansh@chehra.ai">divyansh@chehra.ai</a>
        </p>
        <p className="text-white mb-small mt-medium">
          <strong>Phone:</strong> <a href="tel:919068662279">+91-9068662279</a>
        </p>
        <p className="text-white mb-small mt-medium">
          <strong>Address:</strong><br />
          P no 16,<br />
          D I S Colony,<br />
          Sector 22,<br />
          Faridabad- 121005,<br />
          Haryana
        </p>
        <p className="text-white mb-small mt-medium">
          For support and general inquiries, feel free to reach out to our CEO, Divyansh Jain, at the email address provided. We strive to respond to all inquiries promptly and ensure that your experience with Chehra.AI is exceptional.
        </p>
        <p className="text-white mb-small mt-medium">
          Thank you for choosing Chehra.AI. We look forward to connecting with you!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
