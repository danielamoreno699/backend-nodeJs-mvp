import { Schema,model } from "mongoose";
import {Registration} from "../interface/registration.interface";

const registrationSchema = new Schema <Registration>(
    
    {
        tournament_reservation: { 
            type: Schema.Types.ObjectId, 
            ref: "Tournament" 
        },
        user_registration: { 
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

const registrationModel = model<Registration>("Registration", registrationSchema);
export default registrationModel;