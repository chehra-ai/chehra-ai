import React, { useState } from "react";
import TextInput from "components/TextInput";
import classes from "styles/pages/Authentication.module.css";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import ClickButton from "components/ClickButton";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { login } from "store/authSlice";
import { showLoader, hideLoader } from "store/loaderSlice";

const ManageAuth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(showLoader());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get a reference to the database service
      const db = getDatabase();
      let payload = {
        uid: user.uid,
        refreshToken: user.stsTokenManager.refreshToken,
        accessToken: user.stsTokenManager.accessToken,
        email: user.email,
        expirationTime: user.stsTokenManager.expirationTime,
        name: name,
      };
      const userRef = ref(db, "users/" + user.uid);

      await set(userRef, {
        name: name,
        influencers: []
      });
      dispatch(login(payload));
      navigate("/create");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
    dispatch(hideLoader());
  };
  return (
    <div>
      <div className={classes.authForm}>
        <TextInput
          label="Name"
          placeholder="Your good name"
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
        />
        <ClickButton buttonText="Sign Up" handler={handleLogin} />
      </div>
      <p className={classes.alreadyUser}>
        Already a user?&nbsp;
        <Link to="/login">
          <span>Sign in</span>
        </Link>
      </p>
      {/* Social Login */}
    </div>
  );
};

export default ManageAuth;
