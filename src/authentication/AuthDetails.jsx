import React, { useEffect, useState } from 'react'
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthDetails = () => {
  
const [authUser, setAuthUser] = useState(null);

useEffect(()=>{

  const listen = onAuthStateChanged(auth, (user)=>{
          if(user){
            setAuthUser(user)
          }
          else{
            setAuthUser(null)
          }
  })

  return()=>{
    listen();
  }

}, [])

const userSignOut = ()=>{

   signOut(auth).then(()=>{
    console.log('Sign Out Successful')
   }).catch(error => console.log(error))

}

  return (
    <div>
      {authUser ? <><p>{`Signed In ${authUser.email}`}</p><button style={{color:'white', backgroundColor:'rgb(141, 32, 184)', width:'70px', height:'20px'}} onClick={userSignOut}>Sign Out</button></> : <p>Signed Out</p>}
    </div>
  )
}

export default AuthDetails;
