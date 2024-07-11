import React, { useEffect } from "react";
import Button from "components/Button";
import "./styles/App.css";
import Navigation from "components/Navigation";
import Footer from "components/Footer"; // Make sure this import exists
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/create');
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="App bg-sec">
      <Navigation />
      <div className="landingDiv text-white">
        <div className="landingText">
          <h1 className="text-white">Create Your</h1>
          <h2 className="text-ter">Virtual Influencer</h2>
        </div>
        
        <p className="landingPara">
          We help you make your own virtual influencers, grow their accounts and get brand deals!
        </p>
        <div className="landingButton">
          <Button buttonText="SignUp for free" isDark={false} url="/signup" />
        </div>
        <img className="landingImage" src="5957993.png" alt="landing" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
