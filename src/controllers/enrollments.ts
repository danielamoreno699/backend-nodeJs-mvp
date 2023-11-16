import {Request, Response} from 'express';
import { handleHttp } from '../utils/error.hanlde';
import { createEnrollment, getEnrollments, getEnrollmentsUser, getEnrollment,updateEnrollment, deleteEnrollment} from '../services/enrollment';
import { RequestExt } from '../middleware/session';




const getEnrollmentsAdminCtrl = async(req: Request, res: Response) => {

    try {
       const responseGetEnrollments = await getEnrollments();
       res.send(responseGetEnrollments);
    } catch (error) {
        handleHttp(res, 'error getting Enrollmentss');
    }

}

const getEnrollmentsUserCtrl = async(req: RequestExt, res: Response) => {
        try {
            const userId = req.user?._id;
                console.log('userId:', userId);

                const userEnrollments = await getEnrollmentsUser(userId);
                console.log('userEnrollment:', userEnrollments);
                res.status(200).json({
                    message: 'User Enrollments retrieved successfully',
                   
                    data: userEnrollments,
                });
        } catch (error) {
            console.log(error);
            handleHttp(res, 'error getting Enrollments for User');
        }
     }



const getEnrollmentCtrl = async({params}: Request, res: Response) => {

    try {
       const {id} = params;
        const responseGetEnrollment= await getEnrollment(id);
        const data = responseGetEnrollment ? responseGetEnrollment : 'Enrollment not found';
       res.send(data);
    } catch (error) {
        console.log(error)
        handleHttp(res, 'error getting Enrollment');
    }

}


const createEnrollmentCtrl = async (req: Request, res: Response) => {
    try {
      
        const { tournamentId, userId, league, club, category, practice_location } = req.body;

        
        const responseCreateEnrollment = await createEnrollment(tournamentId, userId, {
            league,
            club,
            category,
            practice_location,
        });

        
        res.status(200).json({
            message: 'Enrollment created successfully',
            data: responseCreateEnrollment,
        });
    } catch (error) {
       
        console.log(error)
        handleHttp(res, 'Error creating Enrollment');
    }
};

const updateEnrollmentCtrl = async({params, body}: Request, res: Response) => {
    
        try {
        const {id} = params;
        const responseUpdateEnrollment = await updateEnrollment(id, body);
        res.send(responseUpdateEnrollment);
        } catch (error) {
            handleHttp(res, 'error updating Enrollment');
        }
    
    }

const deleteEnrollmentCtrl = async({params}: Request, res: Response) => {
        
            try {
            const {id} = params;
            const responseDeleteEnrollment = await deleteEnrollment(id);
            res.send(responseDeleteEnrollment);
            } catch (error) {
                handleHttp(res, 'error deleting Enrollment');
            }
        
        }

export {getEnrollmentsAdminCtrl, getEnrollmentsUserCtrl, getEnrollmentCtrl, createEnrollmentCtrl, deleteEnrollmentCtrl, updateEnrollmentCtrl};