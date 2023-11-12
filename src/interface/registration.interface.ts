import { Tournament } from "./tournament.interface";
import { User } from "./user.interface";

export interface Registration {


    tournament_reservation: Tournament;
    user_registration: User;
    league: string;
    club: string;
    category: string;
    practice_location: string;

    
}