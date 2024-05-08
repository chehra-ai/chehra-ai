import React, { useState } from 'react';
import axios from 'axios';
import NavigationBar from "./NavigationBar";
import "../styles/influencerGeneratorPages/InfluencerGenerator.css"

const CreateInfluencer =()=>{
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);
    const [influencerId, setInfluencerId] = useState('')
  
    const formData = new FormData();
  
    formData.append("Prompt",prompt)
  
    const fetchData = () => {
      axios.post(`http://54.242.182.128:3000/create`,formData)
        .then(response => {
          const data = response.data;
          console.log("Data received:", data); // Logging the data received from the server
          const imageRegex = /Influencer ID: (\d+)/; // Regex to extract src attribute of img tag
          const match = data.match(imageRegex);
          console.log("Matched data:", match); // Logging the match result
          if (match) {
          const id = match[1];
             setInfluencerId('Influencer ID: '+id)
            const imageName = id + '.png'; // Constructing the image name based on ID
            const imageURL = `http://54.242.182.128:3000/static/images/${imageName}`; // Constructing the full image URL
            setImageUrl(imageURL);
            setError(null);
          } else {
              setInfluencerId('Id not found in response')
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
          {influencerId&&<p>{influencerId}</p>}
          </div>
        <br></br>
    <div className="form-container">
    <div className="form">
        <div className="title">Create Influencer</div>
        <textarea placeholder="Your Prompt.."
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} required></textarea>
        <button onClick={fetchData} >Generate</button>
    </div>
          <div>
          {imageUrl && <img src={imageUrl} alt="Influencer_Image"/>} 
          </div>
        </div>
        
    </div>
        </>)
}
export default CreateInfluencer;