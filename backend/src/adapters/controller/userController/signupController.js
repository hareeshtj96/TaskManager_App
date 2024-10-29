import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { signupUseCase } = dependencies.useCase;

    const signupController = async (req, res) => {

        try {
            const { firstName, lastName, email, password } = req.body;
            const response = await signupUseCase(dependencies).executeFunction({ firstName, lastName, email, password });

            if (response.status) {
                return res.status(200).json(response)
            } else {
                return res.status(400).json({ error: response.data || response.message })
            }

        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    return signupController
}

