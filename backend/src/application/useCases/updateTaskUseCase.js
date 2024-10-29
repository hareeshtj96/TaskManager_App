import dependencies from "../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async ({ id, title, description }) => {
        try {
            const updateResponse = await userRepository.updateTask({ id, title, description });

            if (updateResponse.status) {
                return { status: true, message: "Task  updated successfully", data: updateResponse.task };
            } else {
                return { status: false, message: "Failed to update task." };
            }
        } catch (error) {
            console.error("Error in update task use case:", error);
            return { status: false, message: "Internal Server Error" };
        }
    };

    return { executeFunction };
};
