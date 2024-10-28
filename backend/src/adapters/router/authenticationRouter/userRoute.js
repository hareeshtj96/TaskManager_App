import express from "express";
import signupController from "../../controller/userController/signupController.js";
import verifyOtpController from "../../controller/userController/verifyOtpController.js";

export default (dependencies) => {
    const router = express.Router();

    router.post('/signup', signupController(dependencies));
    router.post('/verify_otp', verifyOtpController(dependencies));

    return router;
};
