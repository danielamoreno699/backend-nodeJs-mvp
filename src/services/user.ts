import {Request, Response} from 'express';
import  userModel from '../model/user';
import  {User} from '../interface/user.interface';


const getUsers = async () => {
    
    const responseGetUsers = await userModel.find({}).select('name last_name email role');


    const formattedUsers = responseGetUsers.map((user) => ({
        _id: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        img : user.img
    }));

    return formattedUsers;
}


const getUser = async (id: string) => {
   
    const responseGetUser = await userModel.findById(id).select('name last_name email role img');

    if (!responseGetUser) {
        throw new Error('User not found');
    }

    const formattedUser = {
        name: responseGetUser.name,
        last_name: responseGetUser.last_name,
        email: responseGetUser.email,
        role: responseGetUser.role,
        img: responseGetUser.img,
    };

    return formattedUser;
};

const updateUser = async(id: string, data: Partial<User>) => { 
    const responseUpdateUser = await userModel.findOneAndUpdate(
        { _id: id },
        { $set: data }, 
        { new: true } 
    );
    return responseUpdateUser;
}


const deleteUser = async(id: string) => {
    const responseDeleteUser = await userModel.findByIdAndDelete(id);
    return responseDeleteUser;
}

const createUser = async(user: User) => {
    const responseCreateUser = await userModel.create(user);
    return responseCreateUser;
}

export {getUsers, updateUser, getUser, deleteUser, createUser};

