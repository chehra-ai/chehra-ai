import React from "react";
import classes from "styles/components/OutlinedButton.module.css";

const OutlinedButton = ({ buttonText, isDark = true }) => {
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

export default OutlinedButton;
