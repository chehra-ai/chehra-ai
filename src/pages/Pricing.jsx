import React, { useState, useEffect } from "react";
import classes from "styles/pages/Pricing.module.css";
import Navigation from "components/Navigation";
import Button from "components/Button";
import ClickButton from "components/ClickButton";
import { FaFaceLaughWink } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Footer from "components/Footer";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/loaderSlice";

const Pricing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUid(user.uid);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePricing = async (plan) => {
    if (!uid) {
      navigate("/signup");
      return;
    }

    const db = getFirestore();
    let credits;

    switch (plan) {
      case "basic":
        credits = 500;
        break;
      case "essential":
        credits = 1500;
        break;
      case "premium":
        credits = 10000;
        break;
      default:
        credits = 0;
    }

    try {
      dispatch(showLoader());
      await updateDoc(doc(db, "users", uid), {
        plan: plan,
        credits: credits,
        lastRechargeTime: Timestamp.now()
      });
      dispatch(hideLoader());
      alert('Since you signed up in the first week, you have this subscription for free for the first month!')
      navigate("/create");
    } catch (error) {
      dispatch(hideLoader());
      console.error("Error updating plan: ", error);
    }
  };

  return (
    <div className={classes.pricing}>
      <Navigation />
      <div className={`mt-large ${classes.pricing_header}`}>
        <h2 className="text-white">Pricing Plans</h2>
        <h3 className="text-ter mt-medium">for teams of all Sizes</h3><br /><br />
        <div className={classes.free}>
          {isLoggedIn ? <Button buttonText="Continue for free" url="/create" /> : <Button buttonText="Get Started for free" url="/signup" />}
        </div>
        <p className={"text-grey " + classes.pricing_text}>
          OR
        </p>
      </div>
      <div className={`${classes.price_details}`}>
        <div>
          <div className={`${classes.price_div} bg-white`}>
            <div className={`${classes.div_data}`}>
              <img className={`${classes.images}`} src="/pricing-1.png" /><br /><br />
              <h3 className="mb-medium">Basic</h3>
              <h4>
                <strike>$4.99 <span className={`${classes.pricing_span}`}>/month</span></strike><br />Free for first month
              </h4>
            </div>
            <div className={`${classes.div_features}`}>
              <ul className={`${classes.feature_list}`}>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>500 Credits Everyweek</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>Maximum 5 Influencers</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>No Image limit</p>
                </li>
              </ul>
              <ClickButton buttonText="Get Started" handler={() => handlePricing("essential")} />
            </div>
          </div>
        </div>
        <div>
          <div className={`${classes.price_div} bg-white ${classes.middle}`}>
            <div className={`${classes.div_header} bg-p text-white`}>
              <h6>Most Popular</h6>
              <FaFaceLaughWink />
            </div>
            <div className={`${classes.div_data}`}>
              <img className={`${classes.images}`} src="/pricing-2.png" /><br /><br />
              <h3 className="mb-medium">Essential</h3>
              <h4>
              <strike>$14.99 <span className={`${classes.pricing_span}`}>/month</span></strike><br />Free for first month
              </h4>
            </div>
            <div className={`${classes.div_features}`}>
              <ul className={`${classes.feature_list}`}>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>1,500 Credits Everyweek</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>No Influencer limit</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>No Image limit</p>
                </li>
              </ul>
              <ClickButton buttonText="Get Started" handler={() => handlePricing("essential")} />
            </div>
          </div>
        </div>
        <div>
          <div className={`${classes.price_div} bg-white`}>
            <div className={`${classes.div_data}`}>
              <img className={`${classes.images}`} src="/pricing-3.png" /><br /><br />
              <h3 className="mb-medium">Premium</h3>
              <h4>
              <strike>$29.99 <span className={`${classes.pricing_span}`}>/month</span></strike><br />Free for first month
              </h4>
            </div>
            <div className={`${classes.div_features}`}>
              <ul className={`${classes.feature_list}`}>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>10,000 Credits Everyweek</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>No Influencer limit</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>No Image limit</p>
                </li>
              </ul>
              <ClickButton buttonText="Get Started" handler={() => handlePricing("premium")} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
