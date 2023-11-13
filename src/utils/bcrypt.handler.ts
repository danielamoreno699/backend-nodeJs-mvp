import { hash, compare } from 'bcryptjs';

const encrypt = async (password: string)=> {
    const passwordHash = await hash(password, 10);
    return passwordHash;
}

const decrypt = async (password: string, hashedPassword: string)=> {
    const isPasswordMatch = await compare(password, hashedPassword);
    return isPasswordMatch;
}

export {encrypt, decrypt};