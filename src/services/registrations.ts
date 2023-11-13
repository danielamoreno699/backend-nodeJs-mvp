
import  registrationModel from '../model/user';
import  {Registration} from '../interface/registration.interface';

// operations for regular users 

const createRegistration = async(registration: Registration)=> {  // user can create a registration
    const responseCreateRegistration = await registrationModel.create(registration);
    await responseCreateRegistration.save();
    //return responseCreateRegistration;
    
    }

const getRegistrations = async()=> {  // user can get list of registrations
    const responseGetRegistrations = await registrationModel.find({});
    
    return responseGetRegistrations;
    
    }


const getRegistration = async(id: string)=> {  // user can get list of registrations
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

export {createRegistration, getRegistrations, updateRegistration, deleteRegistration, getRegistration};