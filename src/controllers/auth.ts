import { Request, Response } from 'express';
import { registerNewUser, loginUser, renewToken } from '../services/auth';
import { handleHttp } from '../utils/error.hanlde';
import { verifyToken } from '../utils/jwt.handle';

// create users through authentication

const registerNewUserCtrl = async ({ body }: Request, res: Response) => {
    try {
        const responseRegisterNewUser = await registerNewUser(body);
        res.status(201).json({
            message: 'user created successfully',
            data: responseRegisterNewUser
        });
    } catch (error) {
        if((error as Error).message === "User already exists") {
            res.status(409).json({
                message: 'User already exists',
         
            });
        }else{
            handleHttp(res, 'Error creating user');
        }
    }
};

// login users through authentication

const loginUserCtrl = async ({ body }: Request, res: Response) => {
    const { email, password } = body;
    try {
        const resUser = await loginUser({ email, password });

        if (resUser === 'Password does not match' || resUser === 'User does not exist') {
            res.status(401).json({
                message: 'Authentication failed',
                error: resUser
            });
        } else {

            const token = resUser
            const decodedToken = verifyToken(token);
            const { _id, role, email } = decodedToken;


            res.status(200).json({
                message: 'User logged in successfully',
                data: resUser,
                user:{
                    _id,
                    email,
                    role
                }
            });
        }
    } catch (error) {

        handleHttp(res, 'Error during authentication');
    }
};

// renew token
const renewTokenCtrl = async (req: Request, res: Response) => {
    const { _id, email, role } = req.body;
    try {
        const newToken = await renewToken({ _id, email, role });
        res.json({
            message: 'Token renewed successfully',
            data: newToken
        })
    } catch (error) {
        handleHttp(res, 'Error renewing token');
    }

};

export { registerNewUserCtrl, loginUserCtrl, renewTokenCtrl };
