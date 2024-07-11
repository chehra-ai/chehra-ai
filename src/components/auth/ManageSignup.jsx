import React, { useState } from "react";
import TextInput from "components/TextInput";
import classes from "styles/pages/Authentication.module.css";
import { auth, googleProvider } from "../../firebase"; // Assuming googleProvider is correctly configured in your firebase setup
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import ClickButton from "components/ClickButton";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "store/authSlice";
import { showLoader, hideLoader } from "store/loaderSlice";
import Modal from "components/Modal";

const ManageAuth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(showLoader());
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getFirestore();
      const payload = {
        uid: user.uid,
        refreshToken: user.stsTokenManager.refreshToken,
        accessToken: user.stsTokenManager.accessToken,
        email: user.email,
        expirationTime: user.stsTokenManager.expirationTime,
        name: name,
      };
      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        name: name,
        influencers: {},
        credits: 100,
        plan: 'free',
        lastRechargeTime: Timestamp.now(), // Add the current timestamp
      });
      dispatch(login(payload));
      navigate("/pricing");
    } catch (error) {
      setError(error.message); // Update to setError(error.message) for better error message
    }
    dispatch(hideLoader());
  };

  const handleGoogleSignIn = async () => {
    dispatch(showLoader());
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const db = getFirestore();
      const payload = {
        uid: user.uid,
        refreshToken: user.stsTokenManager.refreshToken,
        accessToken: user.stsTokenManager.accessToken,
        email: user.email,
        expirationTime: user.stsTokenManager.expirationTime,
        name: user.displayName,
      };
      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        name: user.displayName,
        influencers: {},
        credits: 100,
        plan: 'free',
        lastRechargeTime: Timestamp.now(), // Add the current timestamp
      });
      dispatch(login(payload));
      navigate("/pricing");
    } catch (error) {
      setError(error.message); // Update to setError(error.message) for better error message
    }
    dispatch(hideLoader());
  };

  return (
    <div>
      <div className={classes.authForm}>
        <TextInput
          label="Name"
          placeholder="Your name"
          value={name}
          setFunction={setName}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter email"
          value={email}
          setFunction={setEmail}
        />
        <TextInput
          label="Password"
          placeholder="Enter password"
          value={password}
          setFunction={setPassword}
          type="password" // Added type="password" to hide the password
        />
        <ClickButton buttonText="Sign Up" handler={handleLogin} />
        <ClickButton buttonText="Sign in with Google" handler={handleGoogleSignIn} />
      </div>
      <p className={classes.alreadyUser}>
        Already a user?&nbsp;
        <Link to="/login">
          <span>Sign in</span>
        </Link>
      </p>
      {error && <Modal message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default ManageAuth;
