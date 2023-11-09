import { Auth } from "./auth.interface";

export interface User extends Auth {
    _id: string;
    name: string;
    last_name: string;
    role: string;
    createdAt: Date;
}