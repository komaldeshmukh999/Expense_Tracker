import React, { useState} from 'react';
import {auth,db} from "./firebase"
import { useNavigate } from 'react-router-dom';
import { ref, onValue, update, remove } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdate } from '../store/Slices/authSlice';

//
export default function expenseFun() {
   const [profileComplete, setProfileComplete] = useState(false);
   const  navigate = useNavigate();
  //logout function for logout button in navbar
   const handleLogout = () => {
    if (auth.currentUser) {
      auth.signOut();
      console.log("user logged out");
      navigate('/login');
    } else {
      console.log("User already logged out.");
    }
  }
   
 return {handleLogout,profileComplete}
}



