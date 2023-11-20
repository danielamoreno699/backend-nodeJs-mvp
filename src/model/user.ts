import { Schema,model } from "mongoose";
import { User } from "../interface/user.interface";

const userSchema = new Schema <User>(

    {
        img: { 
            type: String, 
            required: false 
        },
        name: { 
            type: String, 
            required: true 
        },
        last_name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true
        },
        password: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            required: true 
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
   

)

const userModel = model<User>("User", userSchema);
export default userModel;