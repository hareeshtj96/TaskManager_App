import dependencies from "../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async ({ email }) => {
        try {

            const taskResponse = await userRepository.fetchTask({ email });
            console.log("response from use case:", taskResponse);


            if (taskResponse.status) {
                return { status: true, message: "Task fetched successfully", data: taskResponse.tasks };
            } else {
                return { status: false, message: "Failed to fetch task." };
            }
        } catch (error) {
            console.error("Error in fetch tasks use case:", error);
            return { status: false, message: "Internal Server Error" };
        }
    };

    return { executeFunction };
};
