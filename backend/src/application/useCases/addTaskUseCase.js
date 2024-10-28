import dependencies from "../../frameworks/config/dependencies.js";

export default (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async ({ title, description, email }) => {
        try {

            if (!title || !description) {
                return { status: false, message: "Title and description are required." };
            }

            const taskResponse = await userRepository.addTask({ title, description, email });

            if (taskResponse.status) {
                return { status: true, message: "Task added successfully", data: taskResponse.data };
            } else {
                return { status: false, message: "Failed to add task." };
            }
        } catch (error) {
            console.error("Error in add task use case:", error);
            return { status: false, message: "Internal Server Error" };
        }
    };

    return { executeFunction };
};
