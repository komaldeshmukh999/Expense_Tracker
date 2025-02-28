
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData, setLoading } from '../../store/Slices/profileSlice';
import { auth, db } from '../../firebase/firebase';
import { ref, get, update } from 'firebase/database';
import { setUpdate } from '../../store/Slices/authSlice';
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData, loading } = useSelector((state) => state.profile);
  const update1 = useSelector((state) => state.auth.update1);

  useEffect(() => {
    const fetchProfileData = async () => {
      dispatch(setLoading(true));
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = ref(db, 'users/' + user.uid);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            dispatch(setProfileData(snapshot.val()));
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProfileData();
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setProfileData({ ...profileData, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(db, 'users/' + user.uid);
        await update(userRef, profileData);
        navigate('/welcome');
        dispatch(setUpdate(!update1));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h4 style={{ textAlign: "center" }}>Contact Details</h4>
      <form className="profileForm">
        <div className="form-group1">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profileData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group1">
          <label htmlFor="photoURL">Photo URL</label>
          <input
            type="text"
            id="photoURL"
            name="photoURL"
            value={profileData.photoURL}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="button-group">
        <button type="button" className="btn btn-success" onClick={handleUpdate}>
          Update
        </button>
        <button type="button" className="btn btn-danger" style={{ marginLeft: "5px" }} onClick={() => navigate('/welcome')}>
          Cancel
        </button>
      </div>
    </div>
  );
}
