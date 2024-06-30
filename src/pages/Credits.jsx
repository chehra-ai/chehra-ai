import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "components/Navigation";
import classes from "styles/pages/Create.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "components/Modal";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/loaderSlice";
import Footer from "components/Footer";

const Credits = () => {
  const [uid, setUid] = useState(null);
  const [credits, setCredits] = useState(0);
  const [usage, setUsage] = useState([]);
  const [error, setError] = useState(null);
  const [nextRechargeTime, setNextRechargeTime] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        loadCredits(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadCredits = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCredits(userData.credits);
        setUsage(userData.usage || []);
        calculateNextRechargeTime(userData.lastRechargeTime, userData.plan);
      } else {
        console.log("No such document for user!");
      }
    } catch (error) {
      console.error("Error fetching credits: ", error);
    }
  };

  const calculateNextRechargeTime = (lastRechargeTime, plan) => {
    const rechargeIntervals = {
      'free': 7,
      'basic': 7,
      'essential': 7,
      'premium': 7,
    };

    const lastRechargeDate = lastRechargeTime.toDate();
    const nextRechargeDate = new Date(lastRechargeDate);
    nextRechargeDate.setDate(lastRechargeDate.getDate() + rechargeIntervals[plan]);

    setNextRechargeTime(nextRechargeDate);
  };

  return (
    <div className={classes.credits}>
      <Navigation />
      <div className={classes.create_div}>
        <h2 className="text-white mb-small mt-medium">
          Your Credits: <span className="text-ter">{credits}</span>
        </h2>
        {nextRechargeTime && (
          <p className="text-white">
            Next recharge: <span className="text-ter">{nextRechargeTime.toLocaleString()}</span>
          </p>
        )}<br />
        <Link to="/pricing">
          <u>
            <h3 className="text-ter bt-small">Get More Credits</h3>
          </u>
        </Link>
      </div>
      <div className={classes.usageContainer}>
        <h3 className="text-white">Usage History</h3>
        <br />
        {usage.length > 0 ? (
          <ul className={classes.usageList}>
            {usage.map((entry, index) => (
              <li key={index} className={classes.usageItem}>
                <span className={classes.usageTimestamp}>
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
                <span className={classes.usageAction}>
                  {entry.action === "createInfluencer" ? "Created Influencer" : "Created Image"}
                </span>
                <span className={classes.usageChange + ' text-ter'}>
                  {entry.change > 0 ? `+${entry.change}` : entry.change}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No usage history available.</p>
        )}
      </div>
      {error && <Modal message={error} onClose={() => setError(null)} />}
        <Footer />
    </div>
  );
};

export default Credits;
