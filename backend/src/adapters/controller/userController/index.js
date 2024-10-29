
import signupController from "./signupController.js";
import verifyOtpController from "./verifyOtpController.js";
import loginController from "./loginController.js";
import taskController from "./taskController.js";
import fetchTaskController from "./fetchTaskController.js";
import dragTaskController from "./dragTaskController.js";
import googleSignupController from "./googleSignupController.js";
import googleLoginController from "./googleLoginController.js";

export default (dependencies) => {
    return {
        signupController: signupController(dependencies),
        verifyOtpController: verifyOtpController(dependencies),
        loginController: loginController(dependencies),
        taskController: taskController(dependencies),
        fetchTaskController: fetchTaskController(dependencies),
        dragTaskController: dragTaskController(dependencies),
        googleSignupController: googleSignupController(dependencies),
        googleLoginController: googleLoginController(dependencies),
    }
}