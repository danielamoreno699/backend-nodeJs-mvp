import { Schema,model } from "mongoose";
import {Player} from "../interface/player.interface";

const playerSchema = new Schema <Player>(
    
    {
        name: { 
            type: String, 
            required: true 
        },
        last_name: { 
            type: String, 
            required: true 
        },
        nationality:{
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        },

        club:{
            type: String,
            required: true
        }
    }, {

        versionKey: false,
        timestamps: true
    
    }
)

const playerModel = model<Player>("Player", playerSchema);
export default playerModel;