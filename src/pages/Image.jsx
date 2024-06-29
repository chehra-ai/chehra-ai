import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useApiService } from "../services/apiServices"; // Import useApiService
import classes from "styles/pages/Image.module.css";
import Navigation from "components/Navigation";

const Image = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [uid, setUid] = useState(null);
  const [newPrompt, setNewPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { createImage } = useApiService(); // Destructure createImage from useApiService

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUid(user.uid);
    }
  }, []);

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        if (uid) {
          const docRef = doc(db, "users", uid, "influencers", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setInfluencer(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching influencer: ", error);
      }
    };

    fetchInfluencer();
  }, [id, uid]);

  const handlePromptChange = (e) => {
    setNewPrompt(e.target.value);
  };

  const handleGenerateImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createImage({ prompt: newPrompt, influencerId: id, uid: uid });
      
      if (response) {
        try {
          if (uid) {
            const docRef = doc(db, "users", uid, "influencers", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setInfluencer(docSnap.data());
            } else {
              console.log("No such document!");
            }
          }
        } catch (error) {
          console.error("Error fetching influencer: ", error);
        }
        setNewPrompt("");
      } else {
        console.error("Failed to generate image.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!influencer) {
    return (<div className={classes.loader}>
    <div className={classes.loader_text}>Loading...</div>
  </div>);
  }

  return (
    <div>
      <Navigation />
      <div className={classes.image_container}>
      <h1 className={classes.image_heading}>Influencer Images</h1>
      <h2 className={classes.image_header}><span>Prompt: </span>{influencer.prompt}</h2>
      <div className={classes.images_grid}>
        {influencer.images.map((image, index) => (
          <div key={index} className={classes.image_wrapper}>
            <img src={`http://48.216.218.6:3000/display/${image.url}`} alt={`Influencer ${index}`} />
            <a 
              href={`http://48.216.218.6:3000/display/${image.url}`} 
              download={`influencer_${index}.jpg`} 
              className={classes.download_button}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Download
            </a>
          </div>
        ))}
      </div>
      <form className={classes.generate_image_form} onSubmit={handleGenerateImage}>
        <textarea
          placeholder="Enter new prompt..."
          value={newPrompt}
          onChange={handlePromptChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate New Image"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Image;
