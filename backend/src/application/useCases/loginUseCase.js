import { generateToken } from '../../services/tokenService.js'
import { comparePassword } from '../../services/comparePassword.js';

export const loginUseCase = (dependencies) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async ({ email, password }) => {
        try {
            // Retrieve user details from the repository
            const user = await userRepository.getUserByEmail(email);

            // Check if user exists
            if (!user) {
                return { status: false, message: 'User not found' };
            }

            // Validate the password
            const isPasswordValid = await comparePassword(password, user.data.password);
            if (!isPasswordValid) {
                return { status: false, message: 'Invalid password' };
            }

            // Generate a token for the authenticated user
            const token = generateToken({ user: user.email });

            // Return user details and the token
            return {
                status: true,
                message: 'Login successful',
                data: { token, user: { id: user.data._id, firstName: user.data.firstName, lastName: user.data.lastName, email: user.data.email } }
            };
        } catch (error) {
            console.error("Error in login use case:", error);
            return { status: false, message: 'Internal Server Error' };
        }
    };

    return {
        executeFunction,
    };
};
