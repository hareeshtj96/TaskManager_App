import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { googleLoginUseCase } = dependencies.useCase;

    const googleLoginController = async (req, res) => {
        console.log("entered google controller:");

        try {
            const { name, email } = req.body;

            // Execute Google registration use case
            const response = await googleLoginUseCase(dependencies).executeFunction({ name, email });
            console.log("response from google login controller:", response);

            // Respond based on success or failure
            if (response.status) {
                return res.status(200).json(response);
            } else {
                return res.status(400).json({ error: response.data || response.message });
            }

        } catch (error) {
            console.error("Google Login Controller Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    return googleLoginController;
}
