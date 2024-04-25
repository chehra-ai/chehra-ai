import React, { useState } from 'react';
import axios from 'axios';
import  "styles/PromptComponents/Influencer.css";

const RetrieveImageComponent = () => {
    const [influencerId, setInfluencerId] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleRetrieveImage = async () => {
        try {
            const response = await axios.get(`https://3.88.108.118:3000/img/${influencerId}`);
            setImageUrl(response.data.imageUrl); 
        } catch (error) {
            console.error('Error retrieving image:', error);
        }
    };

    return (
        <div  className='container'>
            <input type="text"  className='influencerIdText' placeholder='Enter Influencer Id' value={influencerId} onChange={(e) => setInfluencerId(e.target.value)} />
            <br /> <br />
            <button  className='generateBtn' onClick={handleRetrieveImage}>Retrieve Image</button> <br />
            {imageUrl && <img src={imageUrl} alt="Influencer" />}
        </div>
    );
};

export default RetrieveImageComponent;
