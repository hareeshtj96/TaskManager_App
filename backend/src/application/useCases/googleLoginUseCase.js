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
                // User already exists,so create token
                const token = generateToken({
                    name: userExists.data.name,
                    email: userExists.data.email
                });
                return { status: true, token, message: "User already exists, logged in successfully" };
            }


            return { status: false, message: "You need to sign up first" };

        } catch (error) {
            console.error("Google Signup Error:", error);
            return { status: false, message: "Internal Server Error" };
        }
    };

    return {
        executeFunction
    };
};
