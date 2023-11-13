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


const createRegistrationCtrl = async({body}: Request, res: Response) => {

    try {
       const responseCreateRegistration = await createRegistration(body);
       res.send(responseCreateRegistration);
    } catch (error) {
        handleHttp(res, 'error creating registration');
    }

}

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