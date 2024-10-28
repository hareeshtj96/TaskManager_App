import express from "express";
import signupController from "../../controller/userController/signupController.js";
import verifyOtpController from "../../controller/userController/verifyOtpController.js";
import loginController from "../../controller/userController/loginController.js";
import taskController from "../../controller/userController/taskController.js";

export default (dependencies) => {
    const router = express.Router();

    router.post('/signup', signupController(dependencies));
    router.post('/verify_otp', verifyOtpController(dependencies));
    router.post('/login', loginController(dependencies));
    router.post('/addTask', taskController(dependencies));

    return router;
};
