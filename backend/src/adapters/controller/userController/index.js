
import signupController from "./signupController.js";
import verifyOtpController from "./verifyOtpController.js";

export default (dependencies) => {
    return {
        signupController: signupController(dependencies),
        verifyOtpController: verifyOtpController(dependencies)
    }
}