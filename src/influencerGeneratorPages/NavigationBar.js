import Logo from "components/Logo";
import Button from "components/Button";
import "../styles/influencerGeneratorPages/NavigationBar.css"
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
<>
<div className="Nav-Ctn">
<nav>
      <Logo isDark={false} />
</nav>
<div className="btn-ctn">
<div className="btn">
<Link to="/createinfluencer">
<Button buttonText="Create Influencer" isDark={false} />
</Link>
</div>
<div className="btn">
<Link to="/viewinfluencer">
<Button buttonText="View Influencer" isDark={false} />
</Link>
</div>
<div className="btn">
<Link to="/createimageofsameinfluencer">
<Button buttonText="Create Image of same Influencer" isDark={false} />
</Link>
</div>
</div>
</div>
</>
  );
};
export default NavigationBar;
