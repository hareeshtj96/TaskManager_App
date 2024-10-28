import jwt from 'jsonwebtoken';

export default (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async ({ otp, token }) => {
        try {
            // Decode the token 
            const tokenData = jwt.verify(token, process.env.JWT_SECRET);
            console.log("token decoded:", tokenData);
            console.log("User-provided OTP:", otp);


            const { email, otp: tokenOtp, firstName, lastName, password } = tokenData;
            console.log("email extracted:", email);
            console.log("otp extracted:", tokenOtp);


            // Compare the provided OTP with the OTP extracted from the token
            if (String(tokenOtp) !== String(otp)) {
                return { status: false, message: "Invalid OTP" };
            }

            // If OTP matches, update the user's verification status
            const createUserResponse = await userRepository.createUser({
                email,
                firstName,
                lastName,
                password,
            })

            if (createUserResponse) {
                return { status: true, message: "OTP Verified. User created successfully" };
            } else {
                return { status: false, message: "Failed to create user" };
            }


        } catch (error) {
            console.error("Error in OTP verification use case:", error);
            return { status: false, message: "Internal Server Error" };
        }
    };

    return { executeFunction };
};
