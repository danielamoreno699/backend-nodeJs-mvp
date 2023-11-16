import { Tournament } from "./tournament.interface";
import { User } from "./user.interface";

export interface Enrollment {


    tournamentId: Tournament;
    userId: User;
    league: string;
    club: string;
    category: string;
    practice_location: string;

    
}