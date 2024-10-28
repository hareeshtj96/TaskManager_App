import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { verifyOtp } from "../../Redux/Slice/UserSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpPage = () => {
    const dispatch = useDispatch();
    
    // Validation for OTP
    const validation = Yup.object().shape({
        otp: Yup.string()
            .required('OTP is required'),
    });

    return (
        <div className="flex items-center justify-center flex-grow bg-white-100">
            <div className="relative w-full max-w-md mt-0">
                <h2 className="text-2xl font-bold text-left text-blue-500 mb-4">
                    Enter OTP
                </h2>
                <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-500">
                    <Formik 
                        initialValues={{
                            otp: ''
                        }}
                        validationSchema={validation}
                        onSubmit={(values) => {
                            const otpData = {
                                otp: values.otp,
                            };

                            // Dispatch the OTP verification action
                            dispatch(verifyOtp(otpData))
                                .then(() => {
                                    toast.success("OTP verified, User created successfully")
                                })
                                .catch(() => {
                                    toast.error("OTP verification failed")
                                })
                        }}
                    >
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <Field
                                        name="otp"
                                        placeholder="Enter OTP"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                    <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white rounded w-full p-2 hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>

                    
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default OtpPage;
