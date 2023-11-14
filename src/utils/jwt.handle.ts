import {sign, verify} from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "token.02020202"

const createToken = (id: string) => {
    const token = sign({id}, JWT_SECRET, {expiresIn: '5d'});
    return token;
}

const verifyToken = (token: string) => {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
}

export {createToken, verifyToken};