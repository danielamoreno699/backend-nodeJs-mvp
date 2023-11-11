import { Schema,model } from "mongoose";
import {Tournament} from "../interface/tournament.interface";

const tournamentSchema = new Schema <Tournament>(

    {
        name:{
            type: String,
            required: true
        },
        desc:{
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },

        date:{
            type: Date,
            required: true
        },
        capacity_available:{
            type: Number,
            required: true
        },
        img:{
            type: String,
        
        },
        }
)

const tournamentModel = model<Tournament>("Tournament", tournamentSchema);
export default tournamentModel;