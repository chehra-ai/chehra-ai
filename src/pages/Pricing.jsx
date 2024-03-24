import React from "react";
import classes from "styles/pages/Pricing.module.css";
import Navigation from "components/Navigation";
import Button from "components/Button";
import OutlinedButton from "components/OutlinedButton";
import { FaFaceLaughWink } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Pricing = () => {
  return (
    <div className={classes.pricing}>
      <Navigation />
      <div className={`${classes.image_container} mt-large`}>
        <img className={`${classes.images}`} src="/pricing-1.png" />
        <img className={`${classes.images}`} src="/pricing-2.png" />
        <img className={`${classes.images}`} src="/pricing-3.png" />
      </div>
      <div className={`mt-large ${classes.pricing_header}`}>
        <h2 className="text-white">Pricing Plans</h2>
        <h3 className="text-ter mt-medium">for teams of all Sizes</h3>
        <p className={"text-grey " + classes.pricing_text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          eaque praesentium sapiente cupiditate explicabo libero rerum illum
          natus laboriosam perspiciatis facilis harum quisquam distinctio
          quidem, ex nihil delectus ducimus minima.
        </p>
      </div>
      <div className={`${classes.price_details}`}>
        <div>
          <div className={`${classes.price_div} bg-white`}>
            <div className={`${classes.div_data}`}>
              <h3 className="mb-medium">Basic</h3>
              <h4>
                $9.99 <span className={`${classes.pricing_span}`}>/month</span>
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
                  <p>10,000 Credits Everyweek</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>10,000 Credits Everyweek</p>
                </li>
              </ul>
              <OutlinedButton buttonText="Get Started" />
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
              <h3 className="mb-medium">Essential</h3>
              <h4>
                $29.99 <span className={`${classes.pricing_span}`}>/month</span>
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
                  <p>10,000 Credits Everyweek</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>10,000 Credits Everyweek</p>
                </li>
              </ul>
              <Button buttonText="Get Started" />
            </div>
          </div>
        </div>
        <div>
          <div className={`${classes.price_div} bg-white`}>
            <div className={`${classes.div_data}`}>
              <h3 className="mb-medium">Premium</h3>
              <h4>
                $99.99 <span className={`${classes.pricing_span}`}>/month</span>
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
                  <p>10,000 Credits Everyweek</p>
                </li>
                <li>
                  <IoMdCheckmarkCircleOutline />
                  <p>10,000 Credits Everyweek</p>
                </li>
              </ul>
              <OutlinedButton buttonText="Get Started" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
