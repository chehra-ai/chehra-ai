import React, { useState } from "react";
import TextInput from "components/TextInput";
import classes from "styles/pages/Authentication.module.css";
import { auth, googleProvider } from "../../firebase"; // Assuming googleProvider is correctly configured in your firebase setup
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import ClickButton from "components/ClickButton";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "store/authSlice";
import { showLoader, hideLoader } from "store/loaderSlice";
import Modal from "components/Modal"; // Make sure you have a Modal component

const ManageAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to manage error message
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(showLoader());
    setError(null); // Clear previous error
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      let payload = {
        uid: user.uid,
        refreshToken: user.stsTokenManager.refreshToken,
        accessToken: user.stsTokenManager.accessToken,
        email: user.email,
        expirationTime: user.stsTokenManager.expirationTime,
        name: "Unknown",
      };
      dispatch(login(payload));
      navigate("/create");
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

      const payload = {
        uid: user.uid,
        refreshToken: user.stsTokenManager.refreshToken,
        accessToken: user.stsTokenManager.accessToken,
        email: user.email,
        expirationTime: user.stsTokenManager.expirationTime,
        name: user.displayName,
      };
      dispatch(login(payload));
      navigate("/create");
    } catch (error) {
      setError(error.message); // Update to setError(error.message) for better error message
    }
    dispatch(hideLoader());
  };

  return (
    <div>
      <div className={classes.authForm}>
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
        <ClickButton buttonText="Login" handler={handleLogin} />
        <ClickButton buttonText="Sign in with Google" handler={handleGoogleSignIn} />
      </div>
      <p className={classes.alreadyUser}>
        New here?&nbsp;<Link to="/signup"><span>Signup</span></Link>
      </p>
      {/* Render the modal if there's an error */}
      {error && <Modal message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default ManageAuth;
