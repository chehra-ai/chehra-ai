import React from "react";
import classes from "styles/components/Button.module.css";

const Button = ({buttonText}) => {
  return <div className={classes.button}>
    <p>{buttonText}</p>
  </div>;
};

export default Button;