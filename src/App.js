import Button from "components/Button";
import "./styles/App.css";
import Navigation from "components/Navigation";
function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="landingDiv">
        <div className="landingText">
          <h1>Revolutionizing</h1>
          <h2>Influencers with AI</h2>
        </div>
        
        <p className="landingPara">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo.
        </p>
        <div className="landingButton">
          <Button buttonText="Get Started 📍" isDark={false} />
        </div>
        <img src="5957516.png" alt="landing" />
      </div>
    </div>
  );
}

export default App;
