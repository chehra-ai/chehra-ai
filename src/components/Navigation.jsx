import React from "react";
import classes from "styles/components/Navigation.module.css";
import Logo from "components/Logo";
import Button from "components/Button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={classes.navBar}>
      <Link to="/create"><Logo isDark={false} /></Link>
      <div className={classes.navCTA}>
        <Button buttonText="Home" url="/create" isDark={false} />
      </div>
    </nav>
  );
};
export default Navigation;
