import React from "react";
import classes from "styles/pages/Authentication.module.css";
import Logo from "components/Logo";
import ManageLogin from "components/auth/ManageLogin";
import { Link } from "react-router-dom";

const Login = () => {

  return (
    <div className={classes.auth}>
      {/* Left Container */}
      <div className={classes.authLeft}>
        <div className={classes.marketingContainer}>
          <h2 className="text-white">Catalyse.</h2>
          <h2 className="text-ter">Cultivate.</h2>
          <h2 className="text-white">Inspire.</h2>
          <p className="mt-large text-white">
          We help you make your own virtual influencers, grow their accounts and get brand deals!
          </p>
          <img className="mt-medium" src="/5957993.png" />
        </div>
      </div>
      {/* Right Container */}
      <div className={classes.authRight}>
        <div className={`${classes.authFormContainer} bg-white`}>
          <div className={classes.authContent}>
          <h3 className={`${classes.authenticationTitle} mt-large`}>
            Let's sculpt some digital divas 💁🏻‍♀️🙋🏼‍♂️
          </h3>
          <p className={`mt-medium`}>
            Ah, greetings, influencer in the making! Step into the realm of
            Chehra.ai and let your creativity run wild!
          </p>
          </div>
          <ManageLogin/>
        </div>
      </div>
    </div>
  );
};

export default Login;
