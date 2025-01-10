import bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * @param {string} password
 */
export async function hashPassword(password: string | Buffer<ArrayBufferLike>) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

