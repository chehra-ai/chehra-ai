import NavigationBar from "./NavigationBar";
import "../styles/influencerGeneratorPages/InfluencerGenerator.css"
import React, { useState } from 'react';
import axios from 'axios';
const ViewInfluencer =()=>{
    const [id, setId] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
  
    const fetchData = () => {
      axios.get(`http://54.242.182.128:3000/img?image_id=${id}`)
        .then(response => {
          const data = response.data;
          console.log("Data received:", data); // Logging the data received from the server
          const imageRegex = /<img src="([^"]+)"/; // Regex to extract src attribute of img tag
          const match = data.match(imageRegex);
          console.log("Matched data:", match); // Logging the match result
          if (match) {
            const imageName = id + '.png'; // Constructing the image name based on ID
            const imageURL = `http://54.242.182.128:3000/static/images/${imageName}`; // Constructing the full image URL
            setImageUrl(imageURL);
            setError(null);
          } else {
            setError('Image not found in response.');
          }
        })
        .catch(error => {
          console.error("Fetch error:", error); // Logging fetch error
          setImageUrl('');
          setError('Failed to fetch data.');
        });
    };
  
    return (
     <>
      <br></br>
      <div>
          <NavigationBar/>
      </div>
      <br></br>
      <div className="form-container">
  
  <div  className="form">
  <div className="title">View Influencer :</div>
  <input 
          type="text" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          placeholder="Enter ID" 
          className="input"
        required/>
        <button onClick={fetchData}>Fetch Image</button>
  </div>
  
        {error && <p>{error}</p>}
        {imageUrl && <img src={imageUrl} alt="FetchedImage"/>}
      </div>
     </>
    );
}
export default ViewInfluencer;