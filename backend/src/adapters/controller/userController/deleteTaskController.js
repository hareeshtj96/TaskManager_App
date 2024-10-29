import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { deleteTaskUseCase } = dependencies.useCase;

    const deleteTaskStatusController = async (req, res) => {
        try {
            const { id } = req.params;

            // Call the use case to update the task status
            const response = await deleteTaskUseCase(dependencies).executeFunction({ id })

            if (response.status) {
                return res.status(200).json(response);
            } else {
                return res.status(400).json({ error: response.message });
            }

        } catch (error) {
            console.error("Error in delete task  controller:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    return deleteTaskStatusController;
};
