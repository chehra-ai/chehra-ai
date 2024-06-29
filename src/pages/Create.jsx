import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "components/Navigation";
import classes from "styles/pages/Create.module.css";
import { useApiService } from "../services/apiServices";  // Correct the import path
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";  // Import the db object
import LongTextInput from "components/LongTextInput";
import ClickButton from "components/ClickButton";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/loaderSlice";

const Create = () => {
  const { createInfluencer, createImage } = useApiService();
  const [prompt, setPrompt] = useState("");
  const [uid, setUid] = useState(null);
  const [influencerImage, setInfluencerImage] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Define navigate here

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        loadInfluencers(user.uid);  // Load influencers once the user is authenticated
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const loadInfluencers = async (uid) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users", uid, "influencers"));
      const influencersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInfluencers(influencersList);
    } catch (error) {
      console.error("Error fetching influencers: ", error);
    }
  };

  const cI = async () => {
    dispatch(showLoader());
    if (uid) {
      await createInfluencer({ prompt, uid }).then(r=>{
        navigate(`/image/${r}`);
        loadInfluencers(uid);
      })
      
    } else {
      console.log("User is not logged in.");
      setInfluencerImage(null);
    }
    dispatch(hideLoader());
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
            buttonText="Create Influencer"
          />
        </div>
        <h2 className = {classes.inf}>Your Influencers</h2>
        {influencerImage && (
          <div className={classes.imgContainer}>
            <img src={influencerImage} alt="Influencer" />
          </div>
        )}
        <div className={classes.images_grid}>
          {influencers.length>0 ? influencers.map(influencer => (
            <div key={influencer.id} onClick={() => handleImageClick(influencer.id)}>
              <img src={`http://48.216.218.6:3000/display/`+influencer.images[0].id} alt={influencer.prompt} />
              <section className={classes.imgText}>{influencer.prompt.length>50 ? influencer.prompt.substring(0, 54) + "..." : influencer.prompt}</section>
            </div>
          )) : <section className={classes.section}><span>No influencers</span>, write a prompt and Click <span>"Create Influencer"</span> to Create one</section>}
        </div>
      </div>
    </div>
  );
};

export default Create;
