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
    console.error("Error Details:", err.response ? err.response.data : err.message);
    throw new Error(err.response ? err.response.data.error : err.message);
  }
};

export const newImage = async ({ prompt, influencerId, uid }) => {
  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("influencer_id", influencerId);
    formData.append("uid", uid);

    let response = await axios.post(`${API_BASE_URL}/img`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false,
    });

    console.log("Response Headers:", response.headers);
    return response.data;
  } catch (err) {
    console.error("Error Details:", err.response ? err.response.data : err.message);
    throw new Error(err.response ? err.response.data.error : err.message);
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

      return `${influencerId}`;
    } catch (err) {
      console.error("Error creating influencer:", err.message);
      return null;
    }
  };

  const createImage = async ({ prompt, influencerId, uid }) => {
    try {
      const response = await newImage({
        prompt: prompt,
        influencerId: influencerId,
        uid: uid,
      });
      let image_url = response.image_url;
      if (image_url) {
        return true;
      }
    } catch (err) {
      return { message: "Error creating image: " + err.message };
    }
  };

  return {
    createInfluencer,
    createImage,
  };
};
