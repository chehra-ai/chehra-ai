import app from "../firebase";
import axios from "axios";
import { get, getDatabase, ref, update, set } from "firebase/database";
import { arrayUnion } from "firebase/firestore";
import { useSelector } from "react-redux";

const API_BASE_URL = "http://48.216.218.6:3000";

export const newInfluencer = async ({ prompt, useruid }) => {
  try {
    const formData = new FormData();
    formData.append("Prompt", prompt);
    formData.append("uid", useruid);

    let response = await axios.post(`${API_BASE_URL}/create`, formData);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const newImage = async ({ prompt, influencerId }) => {
  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("influencer_id", influencerId);
    let response = await axios.post(`${API_BASE_URL}/img`, formData);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Custom Hook to use API Service
export const useApiService = () => {
  const useruid = useSelector((state) => state.auth.uid);

  const createInfluencer = async (data) => {
    try {
      const response = await newInfluencer({ prompt: data, useruid: useruid });
      let influencerId = response.influencer_id;
      let image_url = response.image_url;

      let imageIdToAdd = image_url.split("/display/")[1];
      let influencerToAdd = {
        influencer_id: influencerId,
        images: [imageIdToAdd],
      };
      const db = getDatabase(app);
      // Append the influencer id to the particular user's list of influencers
      const userRef = ref(db, "users/" + useruid + "/influencers");

      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const influencers = snapshot.val();
        const influencersArray = Object.keys(influencers).map(
          (key) => influencers[key]
        );
        await set(userRef, [...influencersArray, influencerToAdd]);
      } else {
        await set(userRef, [influencerToAdd]);
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const createImage = async ({ prompt, influencerId }) => {
    try {
      const response = await newImage({
        prompt: prompt,
        influencerId: influencerId,
      });
      let image_url = response.image_url;

      let imageIdToAdd = image_url.split("/display/")[1];

      const db = getDatabase(app);
      const docRef = ref(db, "users/" + useruid + "/influencers");

      const snapshot = await get(docRef);
      const updatedInfluencers = snapshot.val().map((influencer) => {
        if (influencer.influencer_id === influencerId) {
          return {
            ...influencer,
            images: [...influencer.images, imageIdToAdd],
          };
        }
        return influencer;
      });
      // Construct the update object
      const updateObject = {};
      updateObject[`users/${useruid}/influencers`] = updatedInfluencers;

      // Update the influencers array in Firebase
      await update(ref(db), updateObject);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    createInfluencer,
    createImage,
  };
};
