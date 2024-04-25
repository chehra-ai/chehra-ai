import React, { useState } from 'react';
import axios from 'axios';
import  "styles/PromptComponents/Influencer.css";

const ImageComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [influencerId, setInfluencerId] = useState('');

    const handleUploadImage = async () => {
        try {
            const response = await axios.post('https://3.88.108.118:3000/img', {
                Prompt: prompt,
                image_id: influencerId
            });
            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    

    return (
        <div className='container'>
            <textarea className='promptText'  spellcheck="false" placeholder="Enter Prompt here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <br/>
            <input className='influencerIdText' type="text" placeholder='Enter Influencer Id..' value={influencerId} onChange={(e) => setInfluencerId(e.target.value)} />
            <br />
            <br />
            <button className='generateBtn' onClick={handleUploadImage}>Upload Image</button>
        </div>
    );
};

export default ImageComponent;
