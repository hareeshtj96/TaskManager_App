import bcrypt from 'bcrypt';

export const comparePassword = async (plainPassword, hashedPassword) => {
    if (!plainPassword || !hashedPassword) {
        throw new Error('Both password and hash must be provided');
    }
    return await bcrypt.compare(plainPassword, hashedPassword)
}