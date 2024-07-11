import React from "react";
import classes from "styles/components/TextInput.module.css";

const TextInput = ({ label, placeholder, value, setFunction, type = "text" }) => {
  const handleChange = (e) => {
    setFunction(e.target.value);
  };

  return (
    <div className={classes.inputContainer}>
      <label className={`${classes.label} ml-small text-black`}>{label}</label>
      <input
        type={type} // Use the type prop here
        value={value}
        placeholder={placeholder}
        className={classes.input}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
