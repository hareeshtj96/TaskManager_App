import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { loginUseCase } = dependencies.useCase;

    const loginController = async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("User data in login controller:", { email, password });

            // Use case for user login
            const response = await loginUseCase(dependencies).executeFunction({ email, password });
            console.log("Response from login use case:", response);

            if (response.status) {
                return res.status(200).json(response);
            } else {
                return res.status(401).json({ error: response.message });
            }

        } catch (error) {
            console.error("Error in login controller:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    return loginController;
};
