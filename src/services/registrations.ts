

import  {Registration} from '../interface/registration.interface';
import registrationModel from '../model/registration';

// operations for regular users 

const createRegistration = async(tournamentId:string, userId: string, registration: Partial<Registration>)=> {

    const registrationData = {
        tournamentId: tournamentId,
        userId: userId,
        ...registration
    };
    
    try {
        const responseCreateRegistration = await registrationModel.create(registrationData);
        await responseCreateRegistration.save();
    } catch (error) {
        throw new Error('error creating registration');
    }
    
    }

const getRegistrations = async()=> {  // admin  can get all list of registrations
    const responseGetRegistrations = await registrationModel.find({}) 
    return responseGetRegistrations;
    
    }

const getRegistrationsUser = async(userId: string)=> {  // user can get list of registrations that he created
    const responseGetRegistrations = await registrationModel.find({userId}) 
    return responseGetRegistrations;
    
    }


const getRegistration = async(id: string)=> {  // user can get a single registration
    const responseGetRegistration = await registrationModel.findById({_id: id});
    return responseGetRegistration;
    
    }


const updateRegistration = async(id: string, data: Registration) => { // user can get access to registration details and modify them
    const updateRegistration = await registrationModel.findByIdAndUpdate({_id: id}, data, {new: true});
    return updateRegistration;
}

const deleteRegistration = async(id: string) => { // user can delete a registration
    const deleteRegistration = await registrationModel.findByIdAndDelete({_id: id});
    return deleteRegistration;
}

export {createRegistration, getRegistrations, updateRegistration, deleteRegistration, getRegistration, getRegistrationsUser};