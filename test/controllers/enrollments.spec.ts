import request from 'supertest';
import { mockRequest } from 'jest-mock-req-res';
import express, { Application } from 'express';
import { getEnrollmentsAdminCtrl, getEnrollmentsUserCtrl, getEnrollmentCtrl, createEnrollmentCtrl, deleteEnrollmentCtrl, updateEnrollmentCtrl} from '../../src/controllers/enrollments';
import ROLES from '../../src/config/roles_list';
import { authRole } from '../../src/middleware/session';

jest.mock('../../src/services/enrollment', () => ({
    getEnrollments: jest.fn(),
    getEnrollmentsUser: jest.fn(),
    getEnrollment: jest.fn(),
    createEnrollment: jest.fn(),
    updateEnrollment: jest.fn(),
    deleteEnrollment: jest.fn(),
  }));
  



  jest.mock('../../src/middleware/session', () => ({
    authRole: (role: string) => (req: any, res: any, next: any) => {
      req.user = { _id: '1', role: 'USER' };
      next();
    },
  }));

  const app: Application = express();
  app.use(express.json());
  
  app
    .get('/', authRole(ROLES.USER),  getEnrollmentsUserCtrl)
    .get('/users', authRole(ROLES.ADMIN), getEnrollmentsAdminCtrl)
    .get('/:id', getEnrollmentCtrl)
    .post('/',  createEnrollmentCtrl)
    .put('/:id',  updateEnrollmentCtrl)
    .delete('/:id', deleteEnrollmentCtrl);


describe(' test for getEnrollmentsUserCtrl  function', () => {
    it('getEnrollmentsUserCtrl should return an array of enrollments when status 200', async () => {

        const enrollments = [
            {
                tournamentId: '1',
                userId: '1',
                league: 'Some League 1',
                club: 'Club 1',
                category: 'Category 1',
                practice_location: 'Location 1',
              },
              {
                tournamentId: '2',
                userId: '1',
                league: 'Some League 2',
                club: 'Club 2',
                category: 'Category 2',
                practice_location: 'Location 2',
              },
          ];

        const mockGetEnrollmentsUserCtrl = jest.fn().mockResolvedValue([enrollments[0], enrollments[1]]);

        (require('../../src/services/enrollment') as any).getEnrollmentsUser = mockGetEnrollmentsUserCtrl;

        const response = await request(app)
        .get('/')
        .set({ user: { _id: '1', role: 'USER' } }); 
      
        const expectedResponse = {
            message: "User Enrollments retrieved successfully",
            data: [enrollments[0], enrollments[1]]
          };
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
        expect(mockGetEnrollmentsUserCtrl).toHaveBeenCalled();

    });

   
});