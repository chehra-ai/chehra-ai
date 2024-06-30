import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "components/Navigation";
import classes from "styles/pages/Create.module.css";
import { useApiService } from "../services/apiServices";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import LongTextInput from "components/LongTextInput";
import ClickButton from "components/ClickButton";
import Modal from "components/Modal";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/loaderSlice";
import { Timestamp } from "firebase/firestore";
import Footer from "components/Footer";
const Create = () => {
  const { createInfluencer } = useApiService();
  const [prompt, setPrompt] = useState("");
  const [uid, setUid] = useState(null);
  const [influencerImage, setInfluencerImage] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [credits, setCredits] = useState(0);
  const [plan, setPlan] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        loadUserData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        loadCredits(uid)
        setCredits(userData.credits);
        setPlan(userData.plan);
        loadInfluencers(uid);
      } else {
        console.log("No such document for user!");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  const loadCredits = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCredits(userData.credits);

        const lastRechargeTime = userData.lastRechargeTime.toDate();
        const currentTime = new Date();
        const timeDiff = currentTime - lastRechargeTime;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        if (daysDiff >= 7) {
          const newCredits = rechargeCredits(userData.plan);
          await updateDoc(userDoc.ref, {
            credits: userData.credits + newCredits,
            lastRechargeTime: Timestamp.now(),
          });
          setCredits(userData.credits + newCredits);
        }
      } else {
        console.log("No such document for user!");
      }
    } catch (error) {
      console.error("Error fetching credits: ", error);
    }
  };

  const rechargeCredits = (plan) => {
    switch (plan) {
      case "free":
        return 100;
      case "basic":
        return 500;
      case "essential":
        return 1200;
      case "premium":
        return 10000;
      default:
        return 0;
    }
  };

  const loadInfluencers = async (uid) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users", uid, "influencers"));
      const influencersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInfluencers(influencersList);
    } catch (error) {
      console.error("Error fetching influencers: ", error);
    }
  };

  const editCredits = async (uid, amount) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        await updateDoc(userDoc.ref, {
          credits: credits + amount,
          usage: arrayUnion({
            timestamp: new Date().toISOString(),
            action: "createInfluencer",
            change: amount
          })
        });
        setCredits(credits + amount);
      } else {
        console.log("No such document for user!");
      }
    } catch (error) {
      console.error("Error updating credits: ", error);
    }
  };

  const cI = async () => {
    const requiredCredits = 20;

    if ((plan === "free" && influencers.length >= 3) || (plan === "basic" && influencers.length >= 5)) {
      setError({ message: "Upgrade your plan to create more influencers." });
      return;
    }

    if (credits < requiredCredits) {
      setError({ message: "You do not have enough credits to create an influencer." });
      return;
    }

    dispatch(showLoader());
    setError(null);
    try {
      if (uid) {
        const response = await createInfluencer({ prompt, uid });
        if (response) {
          await editCredits(uid, -requiredCredits);
          navigate(`/image/${response}`);
          loadInfluencers(uid);
        } else {
          throw new Error("Failed to create influencer.");
        }
      } else {
        throw new Error("User is not logged in.");
      }
    } catch (error) {
      console.error("Error creating influencer:", error);
      setError({ message: error.message });
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleImageClick = (id) => {
    navigate(`/image/${id}`);
  };

  return (
    <div className={classes.create}>
      <Navigation />
      <div className={classes.create_div}>
        <img className={classes.header_img} src="/5576582.png" />
        <h2 className="text-white mb-small mt-medium">Let's Create.</h2>
        <h3 className="text-ter bt-small">Your Creativity - Our Algorithm</h3>
      </div>
      <div>
        <LongTextInput
          setFunction={setPrompt}
          value={prompt}
          placeholder={"Let the creativity run wild."}
        />
        <div className={classes.buttonContainer}>
          <ClickButton
            handler={cI}
            isDark={true}
            buttonText={<div>Create Influencer<br></br>(20 Credits)</div>}
          />
        </div>
        <h2 className={classes.inf}>Your Influencers</h2>
        {influencerImage && (
          <div className={classes.imgContainer}>
            <img src={influencerImage} alt="Influencer" />
          </div>
        )}
        <div className={classes.images_grid}>
          {influencers.length > 0 ? influencers.map(influencer => (
            <div key={influencer.id} onClick={() => handleImageClick(influencer.id)}>
              <img src={`http://48.216.218.6:3000/display/` + influencer.images[0].id} alt={influencer.prompt} />
              <section className={classes.imgText}>{influencer.prompt.length > 50 ? influencer.prompt.substring(0, 54) + "..." : influencer.prompt}</section>
            </div>
          )) : <section className={classes.section}><span>No influencers</span>, write a prompt and Click <span>"Create Influencer"</span> to Create one</section>}
        </div>
      </div>
      {error && <Modal message={error} onClose={() => setError(null)} />}
        <Footer />
    </div>
  );
};

export default Create;
