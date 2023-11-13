import { Auth } from "../interface/auth.interface";
import { User } from "../interface/user.interface";
import userModel from "../model/user";
import { encrypt, decrypt} from "../utils/bcrypt.handler";
import { createToken } from "../utils/jwt.handle";

const registerNewUser = async ({name, last_name, email, password } : User) => {
    // check if an user already exists

    const checkUser = await userModel.findOne({ email});
    if (checkUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await encrypt(password);

    const newUser = new userModel({
        name,
        last_name,
        email,
        password: hashedPassword,
        role: "user"
    });

    return newUser.save();
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

    const token = createToken(checkEmail.email);

    return token;

}

export { registerNewUser, loginUser };