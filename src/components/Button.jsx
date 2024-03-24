import React from "react";
import classes from "styles/components/Button.module.css";

const Button = ({ buttonText, isDark = true }) => {
  return (
    <div
      className={`${classes.button} ${
        isDark ? "bg-p text-white" : "bg-white text-sec"
      }`}
    >
      <p>{buttonText}</p>
    </div>
  );
};

export default Button;
