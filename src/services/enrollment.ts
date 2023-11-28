

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
        
        responseCreateEnrollment.save();

    } catch (error) {
        throw new Error('error creating Enrollment');
    }
    
    }

const getEnrollments = async()=> {  // admin  can get all list of registrations
    try {
       
        const responseGetEnrollments = await enrollmentModel.find({})
          .populate('tournamentId', 'name')
          .populate('userId', 'name last_name email');
            
        
    
       
        return responseGetEnrollments;
      } catch (error) {
       
        console.error('Error fetching enrollments:', error);
        throw error; 
      }
    
    }

    const getEnrollmentsUser = async (userId?:string) => {
        try {
          // user can get a list of registrations that he created
          const responseGetEnrollments = await enrollmentModel
            .find({ userId })
            .populate('tournamentId', 'name')
            .populate('userId', 'name last_name email');
      
          return responseGetEnrollments;
        } catch (error) {
          console.error('Error fetching enrollments:', error);
          throw error;
        }
      };
      


const getEnrollment = async(id: string)=> {  // user can get a single registration

    try {
       
        const responseGetEnrollment = await enrollmentModel.find({_id:id})
          .populate('tournamentId', 'name')
          .populate('userId', 'name last_name email');
            
        
    
       
        return responseGetEnrollment;
      } catch (error) {
       
        console.error('Error fetching enrollments:', error);
        throw error; 
      }

    
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