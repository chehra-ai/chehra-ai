import app from "../firebase";
import axios from "axios";
import { get, getDatabase, ref, update, set } from "firebase/database";
import { useSelector } from "react-redux";

const API_BASE_URL = "http://48.216.218.6:3000";

export const newInfluencer = async ({ prompt, uid }) => {
  try {
    const formData = new FormData();
    formData.append("Prompt", prompt);
    formData.append("uid", uid);

    let response = await axios.post(`${API_BASE_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });

    console.log("Response Headers:", response.headers);
    return response.data;
  } catch (err) {
    console.error("Error Details:", err.response);
  }
};

export const newImage = async ({ prompt, influencerId }) => {
  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("influencer_id", influencerId);

    let response = await axios.post(`${API_BASE_URL}/img`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });

    console.log("Response Headers:", response.headers);
    return response.data;
  } catch (err) {
    console.error("Error Details:", err.response);
  }
};

// Custom Hook to use API Service
export const useApiService = () => {
  const useruid = useSelector((state) => state.auth.uid);

  const createInfluencer = async ({ prompt, uid }) => {
    try {
      const response = await newInfluencer({ prompt, uid });
      let influencerId = response.influencer_id;
      let image_id = response.image_url;

      return `${API_BASE_URL}/display/${image_id}`;
      
    } catch (err) {
      return null;
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
      const updateObject = {};
      updateObject[`users/${useruid}/influencers`] = updatedInfluencers;

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