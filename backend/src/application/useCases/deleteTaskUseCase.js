import dependencies from "../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async ({ id }) => {
        try {
            const updateResponse = await userRepository.deleteTask({ id });

            if (updateResponse.status) {
                return { status: true, message: "Task  deleted successfully", data: updateResponse.task };
            } else {
                return { status: false, message: "Failed to delete task." };
            }
        } catch (error) {
            console.error("Error in delete task use case:", error);
            return { status: false, message: "Internal Server Error" };
        }
    };

    return { executeFunction };
};
