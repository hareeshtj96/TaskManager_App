import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { signupUser } from "../../Redux/Slice/UserSlice";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.user);

    const state = useSelector((state) => state)
    console.log("state:", state)

    //Validation
    const validation = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be atleast 6 characteres').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    return(
        <div className="flex items-center justify-center flex-grow bg-white-100">
            <div className="relative w-full max-w-md mt-0">
                <h2 className="text-2xl font-bold text-left text-blue-500 mb-4">
                    Sign up
                </h2>
                <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
                    <Formik 
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={validation}
                        onSubmit={(values) => {
                            const userData = {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                password: values.password,
                                confirmPassword: values.confirmPassword
                            };

                            // Dispatch the signup 
                            dispatch(signupUser(userData))
                                .unwrap()
                                .then(() => {
                                    toast.success("OTP sent to email")
                                    setTimeout(() => {
                                        navigate("/otp");
                                    }, 1000);
                                    
                                })
                                .catch((err) => {
                                    toast.error(err.message || "Sign up failed")
                                })
                        }}
                    >
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <Field
                                        name="firstName"
                                        placeholder="First Name"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="mb-4">
                                    <Field
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                                </div>

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

                                <div className="mb-4">
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white rounded w-full p-2 hover:bg-blue-600"
                                >
                                    Sign up
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-4 text-center">
                        <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
                            Sign up with Google
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
export default Signup;