import React, { useState, useEffect } from 'react';

const CustomScreen = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleWindowSizeChange(); 
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);


  const customScreenContent = (
    <><div>
          <h1>Welcome to our mobile site!</h1>
          <p>This is a custom screen for mobile users.</p>
      </div></>
  );


  return (
    <div>
      {isMobile && customScreenContent}
      {!isMobile && children}
    </div>
  );
};

export default CustomScreen;
