import React from "react";
import classes from "styles/components/Button.module.css";

const ClickButton = ({ buttonText, handler, isDark = true, disabled = false, url = false }) => {
  return (
    <div
      onClick={!disabled ? handler : null}
      className={`${classes.button2} ${
        isDark ? "bg-ter text-white" : "bg-white text-sec"
      } ${disabled ? classes.disabled : ""}`}
    >
      <p>{buttonText}</p>
    </div>
  );
};

export default ClickButton;
