import bcrypt from "bcrypt";
import { databaseSchema } from "../database/index.js";

export default {

    getUserByEmail: async (email) => {
        try {
            const user = await databaseSchema.User.findOne({ email });

            if (user) {
                return { status: true, data: user }
            } else {
                return { status: false, message: "user not found" }
            }
        } catch (error) {
            return { status: false, message: "Internal Server Error" }
        }
    },

    checkUserExists: async (email) => {
        try {
            const user = await databaseSchema.User.findOne({ email });

            if (user) {
                return { status: true, data: user }
            } else {
                return { status: false, message: "user not found" }
            }
        } catch (error) {
            return { status: false, message: "Internal Server Error" }
        }
    },

    createUser: async ({ email, firstName, lastName, password }) => {
        try {
            const hashedPassword = null;

            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            // Creat a new user
            const newuser = new databaseSchema.User({
                email,
                firstName,
                lastName,
                password: hashedPassword
            });

            // save new user to database
            const savedUser = await newuser.save();
            return { status: true, data: savedUser }
        } catch (error) {
            console.error("Error creating user:", error);
            return { status: false, message: "Internal Server Error" }
        }
    },

    addTask: async ({ title, description, email }) => {
        try {
            const user = await databaseSchema.User.findOne({ email });

            if (!user) {
                return { status: false, message: "User not found" }
            }

            // Create a new Task
            const newTask = new databaseSchema.Task({
                title,
                description,
                user: user._id
            })

            const savedTask = await newTask.save();

            return { status: true, data: savedTask }
        } catch (error) {
            console.error("Error creating task:", error);
            return { status: false, message: "Internal Server Error" }
        }
    },

    fetchTask: async ({ email }) => {
        try {
            const user = await databaseSchema.User.findOne({ email });

            if (!user) {
                return { status: false, message: "user not found" }
            }

            const tasks = await databaseSchema.Task.find({ user: user._id })

            return { status: true, tasks: tasks }

        } catch (error) {
            console.error("Error fetching tasks:", error);
            return { status: false, message: "An error occured while fetching tasks" }
        }
    },

    updateTaskStatus: async ({ id, status }) => {
        try {
            const updatedTask = await databaseSchema.Task.findByIdAndUpdate(
                id, { status }, { new: true }
            );


            if (!updatedTask) {
                return { status: false, message: "Task not found or update failed" }
            }

            return { status: true, task: updatedTask }
        } catch (error) {
            console.error("Error updating task status:", error);
            return { status: false, message: "An error occured while updating task status" }
        }
    },

    updateTask: async ({ id, title, description }) => {
        try {
            const updatedTask = await databaseSchema.Task.findByIdAndUpdate(
                id,
                { title, description },
                { new: true }
            )

            if (!updatedTask) {
                return { status: false, message: "Task not found or update failed" };
            }

            return { status: true, task: updatedTask };

        } catch (error) {
            console.error("Error updating task:", error);
            return { status: false, message: "An error occurred while updating task" };
        }
    },

    deleteTask: async ({ id }) => {
        console.log(" id from repo:", id);

        try {
            const deletedTask = await databaseSchema.Task.findByIdAndDelete(id);

            if (!deletedTask) {
                return { status: false, message: "Task not found or delete failed" };
            }

            return { status: true, message: "Task deleted successfully", task: deletedTask };

        } catch (error) {
            console.error("Error deleting task:", error);
            return { status: false, message: "An error occurred while deleting the task" };
        }
    }

}
