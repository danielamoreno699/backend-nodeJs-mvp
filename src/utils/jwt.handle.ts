import {sign, verify, JwtPayload} from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "token.02020202"

const createToken = (id: string) => {
    const token = sign({id}, JWT_SECRET, {expiresIn: '5d'});
    return token;
}

const verifyToken = (token: string): JwtPayload => {

    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    } catch (error) {
       
        console.error('Error verifying token:', error);
        throw new Error('Error verifying token');
    }
}

export {createToken, verifyToken};