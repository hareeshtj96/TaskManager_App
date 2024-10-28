import bcrypt from "bcrypt";
import { databaseSchema } from "../database/index.js";
import { addTask } from "../../../../frontend/src/Redux/Slice/UserSlice.js";


export default {

    getUserByEmail: async (email) => {
        console.log("data in repo:", email);
        try {

            console.log("email inside function:", email)

            const user = await databaseSchema.User.findOne({ email });
            console.log("user in repo:", user)

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
            const hashedPassword = await bcrypt.hash(password, 10);

            // Creat a new user
            const newuser = new databaseSchema.User({
                email,
                firstName,
                lastName,
                password: hashedPassword
            });

            // save new user to database
            const savedUser = await newuser.save();
            console.log(" user created successfully:", savedUser);

            return { status: true, data: savedUser }
        } catch (error) {
            console.error("Error creating user:", error);
            return { status: false, message: "Internal Server Error" }
        }
    },

    addTask: async ({ title, description, email }) => {
        try {
            const user = await databaseSchema.User.findOne({ email });
            console.log("user is:", user);

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
    }

}