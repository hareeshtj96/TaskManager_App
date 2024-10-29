import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { loginUser, googleLogin } from "../../Redux/Slice/UserSlice"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../FirebaseConfig/FirebaseConfig.js";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);

    // Validation
    const validation = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });


    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
       
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            //dispatch an action 
            dispatch(googleLogin({
                name: user.displayName,
                email: user.email,
            }))
            .then((response) => {
                if (response.payload?.token) {
                    toast.success("Logged in successfully")
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 1000);
                    
                } else {
                    toast.error("Please sign up first")
                }
               
            });
        } catch(error) {
            console.error("Google Login  Error:", error);
        }
    }

    return (
        <div className="flex items-center justify-center flex-grow bg-white-100">
            <div className="relative w-full max-w-md mt-0">
                <h2 className="text-2xl font-bold text-left text-blue-500 mb-4">
                    Login
                </h2>
                <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
                    <Formik 
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={validation}
                        onSubmit={(values) => {
                            const userData = {
                                email: values.email,
                                password: values.password,
                            };

                            // Dispatch the login action
                            dispatch(loginUser(userData))
                                .unwrap()
                                .then(() => {
                                    toast.success("Login successful!");
                                    setTimeout(() => {
                                        navigate("/dashboard"); 
                                    }, 1000);
                                })
                                .catch((err) => {
                                    toast.error(err.message || "Login failed");
                                });
                        }}
                    >
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="mb-4">
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white rounded w-full p-2 hover:bg-blue-600"
                                >
                                    Login
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-4 text-center">
                        <p>Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button onClick={handleGoogleLogin} className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
