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
    }, {

        versionKey: false,
        timestamps: true
    
    }
)

const registrationModel = model<Registration>("Registration", registrationSchema);
export default registrationModel;