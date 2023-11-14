import { Schema,model } from "mongoose";
import {Registration} from "../interface/registration.interface";

const registrationSchema = new Schema <Registration>(
    
    {
        tournamentId: { 
            type: Schema.Types.ObjectId, 
            ref: "Tournament" 
        },
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: "User" 
        },
        league:{
            type: String,
            required: true
        },
        club:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        practice_location:{
            type: String,
            required: true
        },
    }, {

        versionKey: false,
        timestamps: true
    
    }
)

const registrationModel = model<Registration>("Registration", registrationSchema);
export default registrationModel;