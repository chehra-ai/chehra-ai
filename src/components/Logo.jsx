import React from "react";
import classes from "styles/components/Logo.module.css";

const Logo = ({isDark = true}) => {
  return (
    <div className={classes.logoDiv}>
      <img src="/logo.png" className={classes.img} alt="Chehra.ai Logo" />
      <h4 className={`${isDark ? classes.logoDark : classes.logoLight} ${classes.logoText}`}>Chehra.ai</h4>
    </div>
  );
};

export default Logo;