import {Request, Response} from 'express';
import  UserModel from '../model/user';
import { User } from '../interface/user.interface';

// only for admin operations


const getUsers = async(req: Request, res: Response): Promise<void> => {  // admin can get list of users


    try{
        const users = await UserModel.find();
        res.status(200).json({
            ok:true,
            users
        });
    }catch(error){
        res.status(500).json({
            ok:false,
            error
        });
    }



const updateUser = async(req: Request, data:User): Promise<void> => { // admin can get access to user details and modify them
    try {
        const responseGetUser = await UserModel.findByIdAndUpdate(req.params.id, data, {new: true});
        res.status(200).json({
            ok:true,
            responseGetUser
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            error
        });
        
    }




}
}