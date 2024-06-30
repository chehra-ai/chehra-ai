import React, { useEffect, useState } from "react";
import classes from "styles/components/Navigation.module.css";
import Logo from "components/Logo";
import Button from "components/Button";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ClickButton from "./ClickButton";

const Navigation = () => {
  const [credits, setCredits] = useState(0);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        const userDocRef = doc(db, "users", user.uid);

        // Setup real-time listener
        const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setCredits(doc.data().credits || 0);
          } else {
            console.log("No such document!");
          }
        });

        // Cleanup snapshot listener on unmount
        return () => unsubscribeSnapshot();
      } else {
        setUid(null);
        setCredits(0);
      }
    });

    // Cleanup auth listener on unmount
    return () => unsubscribeAuth();
  }, []);

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLogoClick = () => {
    if (uid) {
      navigate("/create");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className={classes.navBar}>
      <Link to="/" onClick={handleLogoClick}><Logo isDark={false} /></Link>
      <div className={classes.navCTA}>
        {uid && <Link to="/credits"><div className={classes.credits}>Credits: <span>{credits}</span></div></Link>}
        {uid ? (
          <div className={classes.buttonGroup}>
            <Button buttonText="Home" url="/create" isDark={false} />
            <ClickButton handler={logout} buttonText="Log Out" />
          </div>
        ) : (
          <div className={classes.buttonGroup}>
            <Button buttonText="Signup" url="/signup" isDark={false} />
            <Button buttonText="Login" url="/login" isDark={false} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
