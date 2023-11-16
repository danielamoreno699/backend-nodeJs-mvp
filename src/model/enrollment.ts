import { Schema,model } from "mongoose";
import {Enrollment} from "../interface/registration.interface";

const registrationSchema = new Schema <Enrollment>(
    
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

const enrollmentModel = model<Enrollment>("Registration", registrationSchema);
export default enrollmentModel;