import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/RegistrationPage/SignupForm';
import LoginForm from './components/LoginPage/LoginForm';
import WelcomeScreen from './components/MainPage.jsx/WelcomeScreen';
import ProfilePage from './components/ProfileUpdatePage/ProfilePage';
import Layout from './components/Layout';

function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/" element={<Layout />}> {/* Use Layout as parent route*/}
                        <Route path="/welcome" element={<WelcomeScreen />} />
                        <Route path="/profile" element={<ProfilePage />} />
                   </Route>
                </Routes>
            </Router>
     );
}

export default App;
