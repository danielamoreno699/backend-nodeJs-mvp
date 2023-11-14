import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth';

// create users through authentication

const registerNewUserCtrl = async ({ body }: Request, res: Response) => {
    try {
        const responseRegisterNewUser = await registerNewUser(body);
        res.status(201).json({
            message: 'user created successfully',
            data: responseRegisterNewUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error
        });
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
            res.status(200).json({
                message: 'User logged in successfully',
                data: resUser
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error during authentication',
            error
        });
    }
};

export { registerNewUserCtrl, loginUserCtrl };
