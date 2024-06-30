import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/About.module.css";
import Footer from "components/Footer";

const Refund = () => {
  return (
<div className={classes.about}>
      <Navigation /><br />
      <h2 className="text-white mb-small mt-medium">Refund and Cancellation Policy</h2>
      <div className={classes.content}>
        <p className="text-white mb-small mt-medium">
          We offer refunds under the following conditions:
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">Technical Issues: </b>If you experience a technical issue that prevents you from using our services, you may be eligible for a refund. Please contact our support team with details of the issue within 30 days of the occurrence.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">Subscription Cancellation: </b>If you cancel your subscription within the first 14 days of purchase, you are eligible for a full refund. After the 14-day period, refunds are not available.
        </p>
        <p className="text-white mb-small mt-medium">
          You can cancel your subscription at any time through your account settings. Upon cancellation, you will continue to have access to our services until the end of your current billing cycle. No refunds will be provided for the remaining period of the subscription.
        </p>
        <p className="text-white mb-small mt-medium">
          To request a refund or for any inquiries regarding cancellations, please contact us at support@chehra.ai.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Refund;
