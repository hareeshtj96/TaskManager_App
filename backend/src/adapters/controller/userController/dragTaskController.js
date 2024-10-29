import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { dragTAskUseCase } = dependencies.useCase;

    const dragTaskStatusController = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            console.log("Updating task status in controller:", { id, status });

            // Call the use case to update the task status
            const response = await dragTAskUseCase(dependencies).executeFunction({ id, status });
            console.log("Response from update task status controller:", response);

            if (response.status) {
                return res.status(200).json(response);
            } else {
                return res.status(400).json({ error: response.message });
            }

        } catch (error) {
            console.error("Error in update task status controller:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    return dragTaskStatusController;
};
