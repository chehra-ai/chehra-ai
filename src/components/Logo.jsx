import React from "react";
import classes from "styles/components/Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.logoDiv}>
      <img src="/logo.png" className={classes.img} alt="Chehra.ai Logo" />
      <h4 className={classes.logoText}>Chehra.ai</h4>
    </div>
  );
};

export default Logo;