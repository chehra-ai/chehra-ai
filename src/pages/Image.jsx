import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useApiService } from "../services/apiServices";
import classes from "styles/pages/Image.module.css";
import Navigation from "components/Navigation";
import Modal from "components/Modal";
import { arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Image = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [uid, setUid] = useState(null);
  const [newPrompt, setNewPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { createImage } = useApiService();
  const [credits, setCredits] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid);
      loadCredits(user.uid);
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

  const loadCredits = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setCredits(userDoc.data().credits);
      } else {
        console.log("No such document for user!");
      }
    } catch (error) {
      console.error("Error fetching credits: ", error);
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
            action: "createImage",
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

  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await createImage({ prompt: newPrompt, influencerId: id, uid: uid });

      if (response === true) {
        const docRef = doc(db, "users", uid, "influencers", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInfluencer(docSnap.data());
          await editCredits(uid, -10);  // Deduct credits only after successful image creation
        } else {
          console.log("No such document!");
        }
        setNewPrompt("");
      } else if (response && response.message) {
        throw new Error(response.message);
      } else {
        throw new Error("Failed to create image. Please try again.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this influencer?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "users", uid, "influencers", id));
      navigate('/')

    } catch (error) {
      console.error("Error deleting influencer:", error);
      setError({ message: "Failed to delete influencer. Please try again." });
    }
  };

  if (!influencer) {
    return (
      <div className={classes.loader}>
        <div className={classes.loader_text}>Loading...</div>
      </div>
    );
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
              <img src={`/api/display/${image.url}`} alt={`Influencer ${index}`} />
              <a
                href={`/api/display/${image.url}`}
                target="_blank"
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
        <div className={classes.generate_image_form}>
          <textarea
            placeholder="Enter new prompt..."
            value={newPrompt}
            onChange={handlePromptChange}
            required
          />
          <div className={classes.button_group}>
            <button onClick={handleGenerateImage} disabled={loading}>
              {loading ? "Generating..." : <div>Generate Image<br></br>(10 Credits)</div>}
            </button>
            <button onClick={handleDelete} className={classes.delete_button}>
              Delete<br /> Influencer
            </button>
          </div>
        </div>
        {error && <Modal message={error.message} onClose={() => setError(null)} />}
      </div>
    </div>
  );
};

export default Image;
