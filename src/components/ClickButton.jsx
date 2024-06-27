import React from "react";
import classes from "styles/components/Button.module.css";

const ClickButton = ({ buttonText, handler, isDark = true, url = false }) => {
  return (
      <div
        onClick={handler}
        className={`${classes.button} ${
          isDark ? "bg-ter text-white" : "bg-white text-sec"
        }`}
      >
        <p>{buttonText}</p>
      </div>
  );
};

export default ClickButton;
