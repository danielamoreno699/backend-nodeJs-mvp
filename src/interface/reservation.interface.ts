import { Tournament } from "./tournament.interface";
import { User } from "./user.interface";

export interface Reservation {

    _id: string;
    tournament_reservation: Tournament;
    user_reservation: User;
}