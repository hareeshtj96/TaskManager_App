import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { verifyOtpUseCase } = dependencies.useCase;

    const verifyOtpController = async (req, res) => {
        try {
            const { otp } = req.body;
            console.log("otp in verify otp controller:", otp);

            const token = req.headers.authorization?.split(" ")[1];

            //  use case for OTP verification
            const response = await verifyOtpUseCase(dependencies).executeFunction({ otp, token });
            console.log("Response from OTP verification use case:", response);

            if (response.status) {
                return res.status(200).json(response);
            } else {
                return res.status(400).json({ error: response.message });
            }

        } catch (error) {
            console.error("Error in OTP verification controller:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    return verifyOtpController;
};
