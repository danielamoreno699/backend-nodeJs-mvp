import {Request, Response} from 'express';
import { handleHttp } from '../utils/error.hanlde';
import { getRegistrations, getRegistration, updateRegistration, deleteRegistration, createRegistration } from '../services/registrations';

const getRegistrationsCtrl = async(req: Request, res: Response) => {

    try {
       const responseGetRegistrations = await getRegistrations();
       res.send(responseGetRegistrations);
    } catch (error) {
        handleHttp(res, 'error getting registrations');
    }

}

const getRegistrationCtrl = async({params}: Request, res: Response) => {

    try {
       const {id} = params;
        const responseGetRegistration = await getRegistration(id);
        const data = responseGetRegistration ? responseGetRegistration : 'registration not found';
       res.send(data);
    } catch (error) {
        handleHttp(res, 'error getting registration');
    }

}


const createRegistrationCtrl = async (req: Request, res: Response) => {
    try {
        // Extract data from the request body
        const { tournamentId, userId, league, club, category, practice_location } = req.body;

        // Call the createRegistration function with the required arguments
        const responseCreateRegistration = await createRegistration(tournamentId, userId, {
            league,
            club,
            category,
            practice_location,
        });

        // Send the response
        res.status(201).json({
            message: 'Registration created successfully',
            data: responseCreateRegistration,
        });
    } catch (error) {
        // Handle errors
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

export {getRegistrationsCtrl, updateRegistrationCtrl, getRegistrationCtrl, createRegistrationCtrl, deleteRegistrationCtrl};