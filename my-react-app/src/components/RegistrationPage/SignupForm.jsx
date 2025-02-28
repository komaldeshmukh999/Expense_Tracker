import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useSignup } from '../../firebase/authFun';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
});

export default function SignupForm() {
    const { signupUser, firebaseError, isLoading } = useSignup();

    return (
        <div className="form-container">
            <div className="signUpForm">
                <h5>Signup</h5>
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                        try {
                            await signupUser(values.email, values.password, resetForm, setSubmitting);
                        } catch (error) {
                            // Error handling is already done in signupUser function.
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {firebaseError && <div className="error">{firebaseError}</div>}
                            <div>
                                <Field type="email" name="email" id="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <div>
                                <Field type="password" name="password" id="password" placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>
                            <div>
                                <Field type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                                <ErrorMessage name="confirmPassword" component="div" className="error" />
                            </div>
                            <button
                                className="btn btn-primary"
                                style={{ borderRadius: '17px',width:"320px",padding:"5px",marginTop:"10px" }}
                                type="submit"
                                disabled={isSubmitting || isLoading}

                            >
                                {isLoading ? 'Signing up...' : 'Signup'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div style={{ marginTop: '10px' }}>
                <Link to="/login">
                    <button
                        type="button"
                        className="btn btn-success"
                        style={{ marginLeft: '505px', marginTop: '25px' }}
                    >
                        Already have an account? Login
                    </button>
                </Link>
            </div>
        </div>
    );
}