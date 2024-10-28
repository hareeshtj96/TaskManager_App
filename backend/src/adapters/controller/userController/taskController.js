import dependencies from "../../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { addTaskUseCase } = dependencies.useCase;

    const taskController = async (req, res) => {
        try {
            const { title, description, email } = req.body;
            console.log("Task data in add task controller:", { title, description, email });

            // Use case for adding a task
            const response = await addTaskUseCase(dependencies).executeFunction({ title, description, email });
            console.log("Response from add task controller:", response);

            if (response.status) {
                return res.status(201).json(response);
            } else {
                return res.status(400).json({ error: response.message });
            }

        } catch (error) {
            console.error("Error in add task controller:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    return taskController;
};