import { generateToken } from '../../services/tokenService.js';
import dotenv from 'dotenv';
dotenv.config();

export default (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async (data) => {
        try {
            const { email, name } = data;

            // Check if the user already exists
            const userExists = await userRepository.checkUserExists(email);

            if (userExists?.status) {
                const token = generateToken({
                    name: userExists.data.name,
                    email: userExists.data.email
                });
                return {
                    status: true,
                    token,
                    message: "User already exists, logged in successfully"
                };
            }

            // If the user does not exist, proceed to create a new user
            const createUserResponse = await userRepository.createUser({ name, email });
            if (createUserResponse?.status) {

                const token = generateToken({
                    name: createUserResponse.data.name,
                    email: createUserResponse.data.email
                });
                return {
                    status: true,
                    token,
                    message: "User created and logged in successfully"
                };
            } else {
                return {
                    status: false,
                    message: createUserResponse.message || "User creation failed"
                };
            }

        } catch (error) {
            console.error("Google Signup Error:", error);
            return {
                status: false,
                message: "Internal Server Error"
            };
        }
    };

    return {
        executeFunction
    };
};
