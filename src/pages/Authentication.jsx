import React from "react";
import classes from "styles/pages/Authentication.module.css";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Logo from "components/Logo";

const Authentication = () => {
  return (
    <div className={classes.auth}>
      {/* Left Container */}
      <div className={classes.authLeft}>
        <div className={classes.marketingContainer}>
          {/* <h1>Let's</h1>
          <h2>AI-magine</h2>
          <h3>Your Virtual Stardom!</h3>
          <img src="/5957516.png"/> */}
        </div>
      </div>
      {/* Right Container */}
      <div className={classes.authRight}>
        <div className={classes.authFormContainer}>
          <Logo/>
          <h3 className={`${classes.authenticationTitle} mt-large`}>
            Let's sculpt some digital divas 💁🏻‍♀️🙋🏼‍♂️
          </h3>
          <p className={`mt-medium`}>
            Ah, greetings, influencer in the making! Step into the realm of
            Chehra.ai and let your creativity run wild!
          </p>
          <div className={classes.authForm}>
            <TextInput label="Email Address" placeholder="Enter email" />
            <TextInput label="Password" placeholder="Enter password" />
            <Button buttonText="Login" />
          </div>
          {/* Social Login */}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
