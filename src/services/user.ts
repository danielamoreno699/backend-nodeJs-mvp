import {Request, Response} from 'express';
import  UserModel from '../model/user';
import { User } from '../interface/user.interface';

// only for admin operations


const getUsers = async(req: Request, res: Response)=> {  // admin can get list of users
 const responseGetUsers = await UserModel.find({});
 return responseGetUsers;

}

const updateUser = async(req: Request, data:User) => { // admin can get access to user details and modify them
        const responseGetUser = await UserModel.findByIdAndUpdate(req.params.id, data, {new: true});
        return responseGetUser;
    }


export {getUsers, updateUser};