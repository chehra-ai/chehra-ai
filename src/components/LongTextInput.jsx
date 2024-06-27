import React from "react";
import classes from "styles/components/LongTextInput.module.css";

const LongTextInput = ({ setFunction, value, placeholder }) => {
  const handleChange = (e) => {
    setFunction(e.target.value);
  };
  return (
    <div className={classes.textArea}>
      <input
        value={value}
        placeholder={placeholder}
        className={classes.input}
        onChange={handleChange}
      />
    </div>
  );
};

export default LongTextInput;
