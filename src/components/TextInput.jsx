import React from "react";
import classes from "styles/components/TextInput.module.css";

const TextInput = ({ label, placeholder, value }) => {
  return (
    <div className={classes.inputContainer}>
      <label className={`${classes.label} ml-small`}>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className={classes.input}
      />
    </div>
  );
};

export default TextInput;
