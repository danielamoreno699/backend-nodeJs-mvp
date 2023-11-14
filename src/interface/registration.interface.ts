import { Tournament } from "./tournament.interface";
import { User } from "./user.interface";

export interface Registration {


    tournamentId: Tournament;
    userId: User;
    league: string;
    club: string;
    category: string;
    practice_location: string;

    
}