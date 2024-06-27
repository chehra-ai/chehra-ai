import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/Create.module.css";
import { useApiService } from "services/apiServices";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LongTextInput from "components/LongTextInput";
import ClickButton from "components/ClickButton";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/loaderSlice";

const Create = () => {
  const { createInfluencer, createImage } = useApiService();
  const [prompt, setPrompt] = useState("");
  const [uid, setUid] = useState(null);
  const [influencerImage, setInfluencerImage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const cI = async () => {
    dispatch(showLoader());
    if (uid) {
      let response = await createInfluencer({ prompt, uid });
      setInfluencerImage(response);
    } else {
      console.log("User is not logged in.");
      setInfluencerImage(null);
    }
    dispatch(hideLoader());
  };

  // const nI = async () => {
  //   if (uid) {
  //     let response = await createImage({
  //       prompt,
  //       influencerId: "42d7f534-c383-4df9-be69-42b4cfb2fc39",
  //     });
  //     console.log(response);
  //   } else {
  //     console.log("User is not logged in.");
  //   }
  // };

  return (
    <div className={classes.create}>
      <Navigation />
      <div className={classes.create_div}>
        <img className={classes.header_img} src="/5576582.png" />
        <h2 className="text-white mb-small mt-medium">Let's Create.</h2>
        <h3 className="text-ter bt-small">Your Creativity - Our Algotithm</h3>
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
        {influencerImage && (<div className={classes.imgContainer}>
          <img src={influencerImage}/>
        </div>)}
      </div>
    </div>
  );
};

export default Create;
