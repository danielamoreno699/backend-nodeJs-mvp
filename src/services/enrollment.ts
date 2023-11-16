

import  {Enrollment} from '../interface/enrollment.interface';
import enrollmentModel from '../model/enrollment';
import tournamentModel from '../model/tournament';

// operations for regular users 

const createEnrollment = async(tournamentId:string, userId: string, registration: Partial<Enrollment>)=> {

    const enrollmentData = {
        tournamentId: tournamentId,
        userId: userId,
        ...registration
    };
    
    try {
        const tournament = await tournamentModel.findById(tournamentId);
        if (!tournament) {
            throw new Error('Tournament not found');
          }
        if (tournament.capacity_available <= 0) {
            throw new Error('No available slots in the tournament');
          }
        const responseCreateEnrollment = await enrollmentModel.create(enrollmentData);
        await tournamentModel.findByIdAndUpdate(tournamentId, {
            $inc: { capacity_available: -1 },
          });
        
        return responseCreateEnrollment;

    } catch (error) {
        throw new Error('error creating Enrollment');
    }
    
    }

const getEnrollments = async()=> {  // admin  can get all list of registrations
    const responseGetEnrollments = await enrollmentModel.find({}) 
    return responseGetEnrollments;
    
    }

const getEnrollmentsUser = async(userId?: string)=> {  // user can get list of registrations that he created
    const responseGetEnrollments = await enrollmentModel.find({userId}) 
    return responseGetEnrollments;
    
    }


const getEnrollment = async(id: string)=> {  // user can get a single registration
    const responseGetEnrollment = await enrollmentModel.findById({_id: id});
    return responseGetEnrollment;
    
    }


const updateEnrollment = async(id: string, data: Enrollment) => { // user can get access to registration details and modify them
   const registration = await enrollmentModel.findById(id);
   if (!registration) {
       throw new Error('Enrollment not found');
   }

    const updateEnrollment = await enrollmentModel.findOneAndUpdate(
         {_id: id},
         { $set: data }, 
         { new: true } 
    );
    return updateEnrollment ;
}

const deleteEnrollment = async(id: string) => { // user can delete a registration
    const deleteEnrollment = await enrollmentModel.findByIdAndDelete({_id: id});
    return deleteEnrollment;
}

export {createEnrollment, getEnrollments, getEnrollmentsUser, getEnrollment,updateEnrollment, deleteEnrollment};