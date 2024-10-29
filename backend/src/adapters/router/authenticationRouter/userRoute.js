import express from "express";
import signupController from "../../controller/userController/signupController.js";
import verifyOtpController from "../../controller/userController/verifyOtpController.js";
import loginController from "../../controller/userController/loginController.js";
import taskController from "../../controller/userController/taskController.js";
import fetchTaskController from "../../controller/userController/fetchTaskController.js";
import dragTaskController from "../../controller/userController/dragTaskController.js";
import googleSignupController from "../../controller/userController/googleSignupController.js";
import googleLoginController from "../../controller/userController/googleLoginController.js";

export default (dependencies) => {
    const router = express.Router();

    router.post('/signup', signupController(dependencies));
    router.post('/verify_otp', verifyOtpController(dependencies));
    router.post('/login', loginController(dependencies));
    router.post('/addTask', taskController(dependencies));
    router.get('/fetchTasks/:email', fetchTaskController(dependencies));
    router.patch('/dragTask/:id/status', dragTaskController(dependencies));
    router.post('/google_signup', googleSignupController(dependencies));
    router.post('/google_login', googleLoginController(dependencies));

    return router;
};
