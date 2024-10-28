import { generateToken } from "../../services/tokenService.js"
import { sentOtpEmail } from "../../services/emailService.js"
import { generateOtp } from "../../services/otpService.js"
import dependencies from "../../frameworks/config/dependencies.js"

export default (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async ({ firstName, lastName, email, password }) => {
        try {
            // check if user already exists
            const userExists = await userRepository.getUserByEmail(email);

            if (userExists.status === true) {
                return { status: true, message: "User already exists" }
            }

            // Generate OTP and Token
            const otp = generateOtp();
            console.log("otp sent:", otp);

            const token = generateToken({ email, otp, firstName, lastName, password });
            console.log("token generated:", token);

            // Send OTP via email
            const emailResponse = await sentOtpEmail(email, otp);
            console.log(" emailResponse:", emailResponse);


            if (emailResponse.status) {
                if (emailResponse.status) {
                    return { status: true, message: "OTP sent successfully", token };
                } else {
                    return { status: false, message: "OTP failed" }
                }
            }
        } catch (error) {
            console.log("error :", error);

            return { status: false, message: "Internal Server Error" };
        }

    }
    return { executeFunction }

}



