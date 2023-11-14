import {sign, verify, JwtPayload} from 'jsonwebtoken';
import { User } from '../interface/user.interface';
const JWT_SECRET = process.env.JWT_SECRET || "token.02020202"

const createToken = ({ email, role }: User): string => {
    const payload = { email, role };
    const token = sign(payload, process.env.JWT_SECRET || "default_secret", { expiresIn: '5d' });
    return token;
};

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