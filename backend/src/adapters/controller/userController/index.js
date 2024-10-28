
import signupController from "./signupController.js";
import verifyOtpController from "./verifyOtpController.js";
import loginController from "./loginController.js";
import taskController from "./taskController.js";

export default (dependencies) => {
    return {
        signupController: signupController(dependencies),
        verifyOtpController: verifyOtpController(dependencies),
        loginController: loginController(dependencies),
        taskController: taskController(dependencies),
    }
}