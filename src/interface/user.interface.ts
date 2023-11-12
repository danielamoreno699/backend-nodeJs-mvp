import { Auth } from "./auth.interface";

export interface User extends Auth {
    name: string;
    last_name: string;
    role: string;
}