import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { ref, set as dbSet } from 'firebase/database';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { setLogin } from '../store/Slices/authSlice';

//useSignup Hook
export const useSignup = () => {
  const [firebaseError, setFirebaseError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();//from react router dom

  const signupUser = async (email, password, resetForm, setSubmitting) => {
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);//firebase
      const user = userCredential.user;
      if (user) {
        //ref=>create a refrence to a specific location in db
        //this will save the data in db with the help of uid generated when we signup.
        await dbSet(ref(db, 'users/' + user.uid), {
          email: email,
        });
        resetForm();
        setSubmitting(false);
        navigate('/');
        return user;
      }
      return null;
    } catch (error) {
      let errorMessage = 'An error occurred.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email address is already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 8 characters.';
      }
      setFirebaseError(errorMessage);
      setSubmitting(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signupUser, firebaseError, isLoading };
};
///useLogin Hook...
export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    setResetEmailSent(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const loginUser = async (email, password, resetForm, setSubmitting) => {
    setFirebaseError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      resetForm();
      setSubmitting(false);
      dispatch(setLogin(true));
      navigate('/welcome');
      console.log('User logged in successfully');
    } catch (error) {
      setFirebaseError(error.message);
      setSubmitting(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (email) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      setFirebaseError(null);
    } catch (error) {
      setFirebaseError(error.message);
      setResetEmailSent(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    showPassword,
    setShowPassword,
    firebaseError,
    isLoading,
    loginUser,
    modalIsOpen,
    openModal,
    closeModal,
    handlePasswordReset,
    resetEmailSent,
  };
};
