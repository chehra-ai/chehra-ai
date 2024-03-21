import React from "react";
import classes from "styles/components/Navigation.module.css";
import Logo from "components/Logo";
import Button from "components/Button";

const Navigation = () => {
  return (
    <nav className={classes.navBar}>
      <Logo isDark={false} />
      <div className={classes.navCTA}>
        <Button buttonText="Start Creating ✅" isDark={false} />
      </div>
    </nav>
  );
};
export default Navigation;
