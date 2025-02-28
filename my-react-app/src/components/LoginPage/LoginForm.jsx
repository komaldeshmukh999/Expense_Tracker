import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Login.css';
import { useLogin } from '../../firebase/authFun';
import ForgotPasswordModal from './ForgotPasswordModal';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
});

export default function LoginForm() {
    const {
        showPassword,
        setShowPassword,
        firebaseError,
        isLoading,
        loginUser,
        modalIsOpen,
        openModal,
        closeModal,
    } = useLogin();

    return (
        <div className="form-container">
            <div className="LoginForm">
                <h5>Login</h5>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                        await loginUser(values.email, values.password, resetForm, setSubmitting);
                    }}
                >
                    {({ values, isSubmitting }) => (
                        <Form>
                            {firebaseError && <div className="error">{firebaseError}</div>}
                            <div>
                                <Field type="email" name="email" id="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div className="password-container">
                                <Field
                                    type={'password'}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ width: '280px', borderRadius: '20px', margin: '3px' }}
                                type="submit"
                                disabled={isSubmitting || isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                            <button class="btn btn-primary" style={{color:"white",marginTop:"10px",backgroundColor:"#007BFF",border:"1px solid #007BFF",padding:"2px",borderRadius:"15px"}} type="button" className="forgot-password-button" onClick={openModal}>
                                Forgot Password?
                            </button>
                        </Form>
                    )}
                </Formik>

                <ForgotPasswordModal isOpen={modalIsOpen} onRequestClose={closeModal} />
            </div>
            <div>
                <Link to="/signup">
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{ marginLeft: '505px', marginTop: '25px' }}
                    >
                        Don't have an account? Sign up
                    </button>
                </Link>
            </div>
        </div>
    );
}