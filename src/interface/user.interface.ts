import { Auth } from "./auth.interface";

export interface User extends Auth {
    name: string;
    last_name: string;
    img: string;
    role: string;
}