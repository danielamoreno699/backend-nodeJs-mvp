import {Request, Response} from 'express';
import  userModel from '../model/user';
import  {User} from '../interface/user.interface';


const getUsers = async()=> {  // admin can get list of users
 const responseGetUsers = await userModel.find({});
 return responseGetUsers;

}


const getUser = async(id: string)=> {  // admin can get list of users
    const responseGetUser = await userModel.findById({_id: id});
    return responseGetUser;
    
    }

const updateUser = async(id: string, data: User) => { // admin can get access to user details and modify them
    const responseUpdateUser = await userModel.findOneAndUpdate({_id: id});
    return responseUpdateUser;
}

export {getUsers, updateUser, getUser};

