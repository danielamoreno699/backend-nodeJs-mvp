import { Tournament } from "./tournament.interface";
import { User } from "./user.interface";

export interface Registration {

    _id: string;
    tournament_reservation: Tournament;
    user_registration: User;
    
}