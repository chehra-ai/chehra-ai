import React, { useState } from 'react'
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthDetails from './AuthDetails';
import { Link } from 'react-router-dom';
import "../styles/authentication/authentication.css"

const SignIn = () => {

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const signIn =(e)=>{
        // todo: signIn
        e.preventDefault();
         
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log(userCredential)
        }).catch((error)=>{
            console.log(error);
        })


    }

  return (
    <div>
       <div className='authdetails'>
        <center>
          <AuthDetails/>
        </center>
       </div>

<form class="form" onSubmit={signIn}>
    <input placeholder="Email address" class="input" type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
    />
    <input placeholder="Password" class="input" type="password" id="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
    /> 
    <button type='submit' id="loginBtn">Sign In</button>

<Link to="/signup">
<button class="create" id="createAccountBtn">Sign Up</button>
</Link>
</form>
    </div>
  )
}

export default SignIn
