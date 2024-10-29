import dependencies from "../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async ({ id, status }) => {
        try {
            const updateResponse = await userRepository.updateTaskStatus({ id, status });

            if (updateResponse.status) {
                return { status: true, message: "Task status updated successfully", data: updateResponse.task };
            } else {
                return { status: false, message: "Failed to update task status." };
            }
        } catch (error) {
            console.error("Error in update task status use case:", error);
            return { status: false, message: "Internal Server Error" };
        }
    };

    return { executeFunction };
};
