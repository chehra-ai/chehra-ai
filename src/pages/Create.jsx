import React, { useState } from "react";
import Navigation from "components/Navigation";
import classes from "styles/pages/Create.module.css";
// import { IoMdAddCircle } from "react-icons/io";
import { useApiService } from "services/apiServices";

const Create = () => {
  const { createInfluencer } = useApiService();
  const [prompt, setPrompt] = useState(
    "A female influencer that looks Indian but is actually from the US wearing traditional clothes with blonde hairs."
  );
  // use Api Service to create a new influencer
  const cI = async () => {
    let response = await createInfluencer({ prompt });
    console.log(response);
  };

  return (
    <div className={classes.create}>
      <Navigation />
      <div className={classes.create_div}>
        <img className={classes.header_img} src="/5576582.png" />
        <h2 className="text-white mb-small mt-medium">Let's Create.</h2>
        <h3 className="text-ter bt-small">Your Creativity - Our Algotithm</h3>
      </div>
      <div>
        <button onClick={cI} className="btn btn-primary">
          Create
        </button>
      </div>
      {/* <div className={`${classes.action_items}`}>
        <div className={`${classes.create_button}`}>
          <IoMdAddCircle />
        </div>
        <div>
          <img className={classes.action_img} src="/work/1.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/2.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/3.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/4.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/5.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/6.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/7.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/8.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/9.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/10.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/11.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/12.jpeg" />
        </div>
        <div>
          <img className={classes.action_img} src="/work/13.jpeg" />
        </div>
      </div> */}
    </div>
  );
};

export default Create;
