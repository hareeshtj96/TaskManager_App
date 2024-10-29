import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { fetchTaskUseCase } = dependencies.useCase;

    const fetchTaskController = async (req, res) => {
        try {
            const { email } = req.params;

            const response = await fetchTaskUseCase(dependencies).executeFunction({ email });

            if (response.status) {
                return res.status(201).json(response);
            } else {
                return res.status(400).json({ error: response.message });
            }

        } catch (error) {
            console.error("Error in fetch task controller:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    return fetchTaskController
};
