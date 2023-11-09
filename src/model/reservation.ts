import { Schema,model } from "mongoose";
import {Reservation} from "../interface/reservation.interface";

const reservationSchema = new Schema <Reservation>(
    
    {
        tournament_reservation: { 
            type: Schema.Types.ObjectId, 
            ref: "Tournament" 
        },
        user_reservation: { 
            type: Schema.Types.ObjectId, 
            ref: "User" 
        },
        number_of_tickets: { 
            type: Number, 
            required: true 
        },
    }, {

        versionKey: false,
        timestamps: true
    
    }
)

const reservationModel = model<Reservation>("Reservation", reservationSchema);
export default reservationModel;