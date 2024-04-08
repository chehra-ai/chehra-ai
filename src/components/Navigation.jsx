import React from "react";
import classes from "styles/components/Navigation.module.css";
import Logo from "components/Logo";
import Button from "components/Button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={classes.navBar}>
      <Logo isDark={false} />
      <div className={classes.navCTA}>
        <Link to="/create">
        <Button buttonText="Start Creating ✅" isDark={false} />
        </Link>
      </div>
    </nav>
  );
};
export default Navigation;
