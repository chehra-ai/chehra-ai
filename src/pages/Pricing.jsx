import React, { useState, useEffect } from "react";
import classes from "styles/pages/Pricing.module.css";
import Navigation from "components/Navigation";
import Button from "components/Button";
import ClickButton from "components/ClickButton";
import { FaFaceLaughWink } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, getFirestore, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Footer from "components/Footer";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "store/loaderSlice";

const Pricing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUid(user.uid);
        setUser(user);

        // Fetch user's current plan
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentPlan(userDoc.data().plan);
        }
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePayment = async (plan, amount) => {
    if (!uid) {
      navigate("/signup");
      return;
    }

    const db = getFirestore();
    let credits;
    let planName;

    switch (plan) {
      case "basic":
        credits = 500;
        planName = "Basic";
        break;
      case "essential":
        credits = 1500;
        planName = "Essential";
        break;
      case "premium":
        credits = 10000;
        planName = "Premium";
        break;
      default:
        credits = 0;
        planName = "";
    }

    const orderData = {
      amount: amount * 100, // amount in cents (1 USD = 100 cents)
      currency: "USD",
      receipt: `receipt_${plan}_${Date.now()}`,
    };

    // Create an order by calling the proxy server
    const response = await fetch("/paymentAPI/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();

    var options = {
      key: "rzp_live_VcFerrVuu3DJdv",
      amount: amount * 100,
      currency: "USD",
      name: "Chehra.AI",
      description: `Purchase ${planName} Plan`,
      order_id: order.id,
      handler: async function (response) {
        try {
          dispatch(showLoader());
          await updateDoc(doc(db, "users", uid), {
            plan: plan,
            credits: credits,
            lastRechargeTime: Timestamp.now(),
          });
          dispatch(hideLoader());
          alert("Subscription successful!");
          navigate("/create");
        } catch (error) {
          dispatch(hideLoader());
          console.error("Error updating plan: ", error);
        }
      },
      prefill: {
        name: user.displayName,
        email: user.email
      },
      theme: {
        color: "#4c4787",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const renderPlans = () => {
    if (currentPlan === "premium") {
      return <h3 className="text-white">You already have the Premium plan!</h3>;
    }

    const plans = [
      { id: "basic", title: "Basic", amount: 4.99, credits: 500, maxInfluencers: 5 },
      { id: "essential", title: "Essential", amount: 14.99, credits: 1500, maxInfluencers: "Unlimited" },
      { id: "premium", title: "Premium", amount: 29.99, credits: 10000, maxInfluencers: "Unlimited" },
    ];

    return plans
      .filter(plan => currentPlan !== plan.id)
      .map(plan => (
        <div key={plan.id}>
          <div className={`${classes.price_div} bg-white`}>
            <div className={`${classes.div_data}`}>
              <img className={`${classes.images}`} src={`/pricing-${plan.id}.png`} /><br /><br />
              <h3 className="mb-medium">{plan.title}</h3>
              <h4>${plan.amount} <span className={`${classes.pricing_span}`}>/month</span></h4>
            </div>
            <div className={`${classes.div_features}`}>
              <ul className={`${classes.feature_list}`}>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>{plan.credits} Credits Everyweek</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>Maximum {plan.maxInfluencers} Influencers</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>No Image limit</p>
                </li>
              </ul>
              {isLoggedIn ? <ClickButton buttonText="Get Started" handler={() => handlePayment(plan.id, plan.amount)} /> : <Button buttonText="Get Started" url="/signup" />}
            </div>
          </div>
        </div>
      ));
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
        {renderPlans()}
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
