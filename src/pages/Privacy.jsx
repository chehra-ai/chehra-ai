import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/About.module.css";
import Footer from "components/Footer";

const Privacy = () => {
  return (
<div className={classes.about}>
      <Navigation /><br />
      <h2 className="text-white mb-small mt-medium">Privacy Policy</h2>
      <div className={classes.content}>
        <p className="text-white mb-small mt-medium">
          Chehra.AI is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">1. Information We Collect: </b> Personal Information: When you register for an account, we collect personal information such as your name, email address, and payment details. This information is necessary to provide our services and to communicate with you. Usage Data: We collect information about how you use our services, including the type of content you create, the features you use, and the frequency and duration of your activities.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">2. How We Use Your Information: </b> Service Provision: We use your personal information to provide and improve our services. This includes processing transactions, providing customer support, and enhancing user experience. Communication: We use your contact information to communicate with you about updates, offers, and promotions related to our services. You can opt-out of these communications at any time. Compliance and Protection: We use your information to ensure compliance with our terms and conditions, to protect our rights and property, and to detect and prevent fraud or other illegal activities.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">3. Data Security: </b> We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and secure server environments.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">4. Data Sharing: </b> We do not share your personal information with third parties, except as necessary to provide our services or comply with legal obligations. This includes sharing information with payment processors, service providers, and regulatory authorities when required.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">5. Your Rights: </b> You have the right to access, modify, or delete your personal information. To exercise these rights, please contact us at privacy@chehra.ai. We will respond to your request within a reasonable timeframe.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">6. Changes to This Policy: </b> We may update this privacy policy from time to time. Any changes will be posted on this page, and we will notify you of significant changes via email or through our website.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
