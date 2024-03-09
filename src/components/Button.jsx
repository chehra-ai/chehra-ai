import React from "react";
import classes from "styles/components/Button.module.css";

const Button = ({ buttonText, isDark = true }) => {
  return (
    <div
      className={`${classes.button} ${
        isDark ? classes.buttonDark : classes.buttonLight
      }`}
    >
      <p>{buttonText}</p>
    </div>
  );
};

export default Button;
