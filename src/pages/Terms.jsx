import React from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/About.module.css";
import Footer from "components/Footer";

const Terms = () => {
  return (
    <div className={classes.about}>
      <Navigation /><br />
      <h2 className="text-white mb-small mt-medium">Terms and Conditions</h2>
      <div className={classes.content}>
        <p className="text-white mb-small mt-medium">
          Welcome to Chehra.AI! These terms and conditions outline the rules and regulations for the use of Chehra.AI's Website and Services. By accessing this website and/or using our services, we assume you accept these terms and conditions. Do not continue to use Chehra.AI if you do not agree to all of the terms and conditions stated on this page.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">1. Services Overview: </b> Chehra.AI provides a unique platform for creating AI-generated virtual influencers and images. Our services allow users to generate, customize, and utilize these virtual influencers for various creative and commercial purposes. We offer a variety of tools and features to enhance user experience and foster creativity.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">2. User Responsibilities: </b> Registration: Users must provide accurate and complete information during the registration process. Failure to do so may result in suspension or termination of your account. Account Security: Users are responsible for maintaining the confidentiality of their account information, including their password. You agree to notify us immediately of any unauthorized use of your account. Prohibited Activities: Users must not use Chehra.AI for any unlawful or prohibited activities. This includes, but is not limited to, activities that violate any laws, infringe on the rights of others, or interfere with the use of our services by others.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">3. Intellectual Property Rights: </b> All content created on Chehra.AI, including virtual influencers and their images, are the property of SAHA AND JAIN INNOVATIVE TECH PRIVATE LIMITED. Users are granted a limited license to use the content generated through our platform for personal or commercial purposes, provided they do not infringe on the intellectual property rights of others.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">4. Limitation of Liability: </b> Chehra.AI is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our services. This includes, but is not limited to, damages for loss of profits, goodwill, data, or other intangible losses resulting from: The use or inability to use our services. Unauthorized access to or alteration of your data. Any actions or content of any third party using our services.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">5. Amendments: </b> We reserve the right to amend these terms and conditions at any time. Users will be notified of any changes via email or through our website. Your continued use of our services after any such changes constitutes your acceptance of the new terms and conditions.
        </p>
        <p className="text-white mb-small mt-medium">
          <b className="text-ter">6. Governing Law: </b> These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which SAHA AND JAIN INNOVATIVE TECH PRIVATE LIMITED is incorporated.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
