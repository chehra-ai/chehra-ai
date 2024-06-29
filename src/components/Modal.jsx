import React from "react";
import PropTypes from "prop-types";
import classes from "styles/components/Modal.module.css"; // Ensure you have corresponding CSS for styling
import ClickButton from "./ClickButton";
const Modal = ({ message, onClose }) => {
  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <p>{message.message.startsWith("Firebase: ") ? message.message.substring("Firebase: ".length).replace(` (${message.code})`, '').trim() : message.message}</p>
        <ClickButton handler={onClose} buttonText={"Close"} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
