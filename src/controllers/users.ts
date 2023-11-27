import {Request, Response} from 'express';
import { handleHttp } from '../utils/error.hanlde';
import { getUsers, updateUser, getUser, deleteUser, createUser } from '../services/user';

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


const deleteUserCtrl = async(req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const deletedUser = await deleteUser(userId);
        res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser,
        });
    } catch (error) {
        handleHttp(res, 'error deleting user');
    }

}


const createUserCtrl = async (req: Request, res: Response) => {
    try {
        const { name, last_name, email, password, role, img } = req.body;

        const responseCreateUser = await createUser({
            name,
            last_name,
            email,
            password,
            role,
            img: img || '' 
        });

        res.status(200).json({
            message: 'User created successfully',
            data: responseCreateUser,
        });
    } catch (error) {
        handleHttp(res, 'Error creating user');
    }
};

export {getUsersCtrl, updateUserCtrl, getUserCtrl, deleteUserCtrl, createUserCtrl};