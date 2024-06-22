import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import classes from "styles/portals/loader.module.css";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  if (!isLoading) return null;

  return ReactDOM.createPortal(
    <div className={classes.loader}>
      <div className={classes.loader_text}>Loading...</div>
    </div>,
    document.getElementById("loader-root")
  );
};

export default Loader;
