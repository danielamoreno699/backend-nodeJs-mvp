import {sign, verify, JwtPayload} from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { Schema } from "mongoose";
const JWT_SECRET = process.env.JWT_SECRET || "token.02020202"

export interface TokenPayload {
    _id: string;
    email: string;
    role: string;
}

const createToken = ({ _id,email, role }: TokenPayload): string => {
        const payload = { _id, email, role };
        const token = sign(payload, process.env.JWT_SECRET || "default_secret");
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