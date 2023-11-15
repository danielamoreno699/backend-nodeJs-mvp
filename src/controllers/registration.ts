import {Request, Response} from 'express';
import { handleHttp } from '../utils/error.hanlde';
import { getRegistrations, getRegistration, updateRegistration, deleteRegistration, createRegistration, getRegistrationsUser } from '../services/registrations';
import { Registration } from '../interface/registration.interface';

interface RequestReg extends Request {
    User?: {
        _id?: string;
    };

}

const getRegistrationsCtrl = async(req: Request, res: Response) => {

    try {
       const responseGetRegistrations = await getRegistrations();
       res.send(responseGetRegistrations);
    } catch (error) {
        handleHttp(res, 'error getting registrations');
    }

}

const getRegistrationsUserCtrl = async(req: RequestReg, res: Response) => {
        try {
            const userId = req.User?._id;
                console.log('userId:', userId);

                const userRegistrations = await getRegistrationsUser(userId);
                console.log('userRegistrations:', userRegistrations);
                res.status(200).json({
                    message: 'User registrations retrieved successfully',
                   
                    data: userRegistrations,
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error getting user registrations' });
        }
     }



const getRegistrationCtrl = async({params}: Request, res: Response) => {

    try {
       const {id} = params;
        const responseGetRegistration = await getRegistration(id);
        const data = responseGetRegistration ? responseGetRegistration : 'registration not found';
       res.send(data);
    } catch (error) {
        console.log(error)
        handleHttp(res, 'error getting registration');
    }

}


const createRegistrationCtrl = async (req: Request, res: Response) => {
    try {
      
        const { tournamentId, userId, league, club, category, practice_location } = req.body;

        
        const responseCreateRegistration = await createRegistration(tournamentId, userId, {
            league,
            club,
            category,
            practice_location,
        });

        
        res.status(201).json({
            message: 'Registration created successfully',
            data: responseCreateRegistration,
        });
    } catch (error) {
       
        console.log(error)
        handleHttp(res, 'Error creating registration');
    }
};

const updateRegistrationCtrl = async({params, body}: Request, res: Response) => {
    
        try {
        const {id} = params;
        const responseUpdateRegistration = await updateRegistration(id, body);
        res.send(responseUpdateRegistration);
        } catch (error) {
            handleHttp(res, 'error updating registration');
        }
    
    }

const deleteRegistrationCtrl = async({params}: Request, res: Response) => {
        
            try {
            const {id} = params;
            const responseDeleteRegistration = await deleteRegistration(id);
            res.send(responseDeleteRegistration);
            } catch (error) {
                handleHttp(res, 'error deleting registration');
            }
        
        }

export {getRegistrationsCtrl, updateRegistrationCtrl, getRegistrationCtrl, createRegistrationCtrl, deleteRegistrationCtrl, getRegistrationsUserCtrl};