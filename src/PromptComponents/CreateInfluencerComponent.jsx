import React, { useState } from 'react';
import axios from 'axios';
import  "styles/PromptComponents/Influencer.css";

const CreateInfluencerComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [influencerId, setInfluencerId] = useState('');

    const handleCreateInfluencer = async () => {
        try {
            const response = await axios.post('https://3.88.108.118:3000/create', { Prompt: prompt });
            setInfluencerId(response.data.influencerId); 
        } catch (error) {
            console.error('Error creating influencer:', error);
        }
    };

    return (
        <div className='container'>
            <textarea className='promptText'    spellcheck="false" placeholder="Type something here..." value={prompt} onChange={(e) => setPrompt(e.target.value)} required/>
            <br />
            <button className='generateBtn' onClick={handleCreateInfluencer}>Create Influencer</button>
            {influencerId && <p>Influencer ID: {influencerId}</p>}
        </div>
        
    );
};

export default CreateInfluencerComponent;
