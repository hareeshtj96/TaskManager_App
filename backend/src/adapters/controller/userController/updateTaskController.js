import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { updateTaskUseCase } = dependencies.useCase;

    const updateTaskStatusController = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            // Call the use case to update the task status
            const response = await updateTaskUseCase(dependencies).executeFunction({ id, title, description });

            if (response.status) {
                return res.status(200).json(response);
            } else {
                return res.status(400).json({ error: response.message });
            }

        } catch (error) {
            console.error("Error in update task  controller:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    return updateTaskStatusController;
};
