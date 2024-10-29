import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { googleRegisterUseCase } = dependencies.useCase;

    const googleSignupController = async (req, res) => {
        try {
            const { name, email } = req.body;

            // Execute Google registration use case
            const response = await googleRegisterUseCase(dependencies).executeFunction({ name, email });

            // Respond based on success or failure
            if (response.status) {
                return res.status(200).json(response);
            } else {
                return res.status(400).json({ error: response.data || response.message });
            }

        } catch (error) {
            console.error("Google Register Controller Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    return googleSignupController;
}
