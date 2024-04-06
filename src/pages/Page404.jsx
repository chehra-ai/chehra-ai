import React from "react"
import classes from "styles/pages/Page404.module.css"

const Page404 = ()=>{
    return(<>
    <div className={classes.container}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for might have been removed or is temporarily unavailable.</p>
      <a href="/">Go back to homepage</a>
    </div>
    
    </>)
}
export default Page404;