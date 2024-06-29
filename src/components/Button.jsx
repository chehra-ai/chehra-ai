import React from "react";
import { Link } from "react-router-dom";
import classes from "styles/components/Button.module.css";

const Button = ({ buttonText, isDark = true, url = false }) => {
  return (
    
    <Link to={url}>
      <div
        className={`${classes.button} ${
          isDark ? "text-white" : "text-sec"
        }`}
      >
        <p>{buttonText}</p>
      </div>
    </Link>
  );
};

export default Button;
