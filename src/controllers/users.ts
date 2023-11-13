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


const updateUserCtrl = async({params, body}: Request, res: Response) => {

    try {
       const {id} = params;
       const responseUpdateUser = await updateUser(id, body);
       res.send(responseUpdateUser);
    } catch (error) {
        handleHttp(res, 'error updating user');
    }

}

export {getUsersCtrl, updateUserCtrl, getUserCtrl};