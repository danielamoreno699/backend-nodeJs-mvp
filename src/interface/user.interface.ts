import { Auth } from "./auth.interface";

export interface User extends Auth {
    img: string;
    name: string;
    last_name: string;
    role: string;
}