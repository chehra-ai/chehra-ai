import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from "./NavigationBar"
import "../styles/influencerGeneratorPages/InfluencerGenerator.css"

const CreateSameInfluencerImage =()=>{

    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const [influencerId, setInfluencerId] = useState('')
  
    const formData = new FormData();
  
    formData.append("prompt",prompt)
    formData.append("image_id",influencerId)
  
    const fetchData = () => {
      axios.post(`http://54.242.182.128:3000/img`,formData)
        .then(response => {
          const data = response.data;
          console.log("Data received:", data); // Logging the data received from the server
          const imageRegex = /<img src="([^"]+)"/; // Regex to extract src attribute of img tag
          const match = data.match(imageRegex);
          console.log("Matched data:", match); // Logging the match result
          if (match) {
          const id = match[1];
          const imageName = id.split('/').pop(); // Constructing the image name based on ID
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

    return(<>
        <br></br>
    <div>
        <NavigationBar/>
    </div>
    <br></br>
    <div>
    <div className='influencer-id'>
          {error && <p>{error}</p>}  
        </div>
          <br></br>
    <div className="form-container">
    <div className="form">
        <div className="title">Create Image Of Same Influencer</div>
        <input type="text" value={influencerId} 
        onChange={(e) => setInfluencerId(e.target.value)} placeholder="Your Influencer ID :" className="input"/>
       
        <textarea value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} placeholder="Your Prompt.."></textarea>
        <button onClick={fetchData} >Generate</button>
    </div>
          <div>
          {imageUrl && <img src={imageUrl} alt="Influencer_Image"/>}
          </div>
        </div>
    </div>
        </>)
}
export default CreateSameInfluencerImage;