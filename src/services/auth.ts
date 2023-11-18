import { Auth } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import userModel from "../model/user";
import { encrypt, decrypt} from "../utils/bcrypt.handler";
import { TokenPayload, createToken } from "../utils/jwt.handle";

const registerNewUser = async ({ name, last_name, email, password, role} : User) => {
    // check if an user already exists

    const checkUser = await userModel.findOne({ email});
    if (checkUser) {
        throw new Error("User already exists");
    }
        const hashedPassword = await encrypt(password);

        let userRole = role || "user";
       
        const newUser = new userModel({
            name,
            last_name,
            email,
            password: hashedPassword,
            role: userRole
        });

       await newUser.save();
       const token = createToken({ _id: newUser._id.toString(), email: newUser.email, role: newUser.role });
        return token;
}


const loginUser = async ({email, password}: Auth) => {
    const checkEmail = await userModel.findOne({email});
    if (!checkEmail) {
        throw new Error("User does not exist");
    }
    const passwordHash = checkEmail.password;
    const isPasswordMatch = await decrypt(password, passwordHash);

    if (!isPasswordMatch) {
        throw new Error("Password does not match");
    }

    const token = createToken({ _id: checkEmail._id.toString(), email: checkEmail.email, role: checkEmail.role });
    console.log(token)
    return token;
  

}

const renewToken = async(token:TokenPayload) =>{
    const newtOken = createToken({ _id: token._id.toString(), email: token.email, role: token.role });
    return newtOken;
}




export { registerNewUser, loginUser, renewToken };