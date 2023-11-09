import { Tournament } from "./tournament.interface";
import { User } from "./user.interface";

export interface Reservation {

    _id: string;
    tournament_reservation: Tournament;
    user_reservation: User;
    number_of_tickets: number; // logic that implements calc for price 
}