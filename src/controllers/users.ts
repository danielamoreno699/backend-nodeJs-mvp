import {Request, Response} from 'express';
import { handleHttp } from '../utils/error.hanlde';
import { getUsers, updateUser, getUser } from '../services/user';

const getUsersCtrl = async(req: Request, res: Response) => {

    try {
       const responseGetUsers = await getUsers();


       res.send(responseGetUsers);
    } catch (error) {
        handleHttp(res, 'error getting users');
    }

}


const getUserCtrl = async({params}: Request, res: Response) => {

    try {
       const {id} = params;
        const responseGetUser = await getUser(id);
        const data = responseGetUser ? responseGetUser : 'user not found';
       res.send(data);
    } catch (error) {
        handleHttp(res, 'error getting user');
    }

}


const updateUserCtrl = async(req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, last_name } = req.body;
    try {
        
        const updatedUser = await updateUser(userId, {
            name, 
            last_name,

        });

        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        handleHttp(res, 'error updating user');
    }

}

export {getUsersCtrl, updateUserCtrl, getUserCtrl};