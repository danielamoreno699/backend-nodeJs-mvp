import {Request, Response} from 'express';
import { registerNewUser, loginUser } from '../services/auth';

// create users through authentication

const registerNewUserCtrl = async({body}: Request, res: Response) => {

    try {
       const responseRegisterNewUser = await registerNewUser(body);
       res.status(201).json({
              message: 'user created successfully',
              data: responseRegisterNewUser
         
       })
       res.send(responseRegisterNewUser);
    } catch (error) {
        res.send(error);
    }

}

// login users through authentication

const loginUserCtrl = async({body}: Request, res: Response) => {
    const {email, password} = body;
    const resUser = await loginUser({email, password});

   if (resUser === "Password does not match" || resUser === "User does not exist") {
       res.status(401)
        res.send(resUser);
   }else {
         res.status(200).json({
                message: 'user logged in successfully',
                data: resUser
         })
         res.send(resUser);
   }

   res.send(resUser);
}

export {registerNewUserCtrl, loginUserCtrl}