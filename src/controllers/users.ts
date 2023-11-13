import {Request, Response} from 'express';
import { handleHttp } from '../utils/error.hanlde';
import { getUsers, updateUser } from '../services/user';

const getUsersController = async(req: Request, res: Response) => {

    try {
       const responseGetUsers = await getUsers();
       res.send(responseGetUsers);
    } catch (error) {
        handleHttp(res, 'error getting users');
    }

}