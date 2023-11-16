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

    it('getEnrollmentsUserCtrl should return an status 500 when an error occurs', async () => {
        const mockGetEnrollmentsUserCtrl = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/enrollment') as any).getEnrollmentsUser = mockGetEnrollmentsUserCtrl;
    
        const response = await request(app)
          .get('/')
          .set({ user: { _id: '1', role: 'USER' } }); 
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'error getting Enrollments for User');
        expect(mockGetEnrollmentsUserCtrl).toHaveBeenCalled();
      })

   
});


describe(' test for getEnrollmentsAdminCtrl  function', () => {
    it('getEnrollmentsAdminCtrl should return an array of enrollments when status 200', async () => {

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
                userId: '2',
                league: 'Some League 2',
                club: 'Club 2',
                category: 'Category 2',
                practice_location: 'Location 2',
              },
          ];

        const mockGetEnrollmentsAdminCtrl = jest.fn().mockResolvedValue([enrollments[0], enrollments[1]]);

        (require('../../src/services/enrollment') as any).getEnrollments = mockGetEnrollmentsAdminCtrl;

        const response = await request(app)
        .get('/users')
        .set({  role: 'ADMIN' } ); 
      
        const expectedResponse = [enrollments[0], enrollments[1]];
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
        expect(mockGetEnrollmentsAdminCtrl).toHaveBeenCalled();

    });

    it('getEnrollmentsAdminCtrl should return an status 500 when an error occurs', async () => {
        const mockGetEnrollmentsAdminCtrl = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/enrollment') as any).getEnrollments = mockGetEnrollmentsAdminCtrl;
    
        const response = await request(app)
          .get('/users')
          .set({  role: 'ADMIN' } ); 
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'error getting Enrollmentss');
        expect(mockGetEnrollmentsAdminCtrl).toHaveBeenCalled();
      })

})


describe('test for getEnrollmentCtrl  function', () => {
    const enrollment = {
        tournamentId: '1',
        userId: '1',
        league: 'Some League 1',
        club: 'Club 1',
        category: 'Category 1',
        practice_location: 'Location 1',
      }
      
    it('getEnrollmentCtrl should return an enrollment when status 200', async () => {
        const mockGetEnrollmentCtrl = jest.fn().mockResolvedValue(enrollment);
        (require('../../src/services/enrollment') as any).getEnrollment = mockGetEnrollmentCtrl;
    
        const response = await request(app).get('/1');
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(enrollment);
        expect(mockGetEnrollmentCtrl).toHaveBeenCalled();
      });
    
      it('getEnrollmentCtrl should return an status 500 when an error occurs', async () => {
        const mockGetEnrollmentCtrl = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/enrollment') as any).getEnrollment = mockGetEnrollmentCtrl;
    
        const response = await request(app).get('/1');
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'error getting Enrollment');
        expect(mockGetEnrollmentCtrl).toHaveBeenCalled();
      });
    
});

describe('test for createEnrollmentCtrl  function', () => {
    const enrollment = {
      tournamentId: '1',
      userId: '1',
      league: 'Some League 1',
      club: 'Club 1',
      category: 'Category 1',
      practice_location: 'Location 1',
    }
  
    it('createEnrollmentCtrl should return an enrollment when status 200', async () => {
      const mockCreateEnrollmentCtrl = jest.fn().mockResolvedValue({
        data: enrollment,
        message: 'Enrollment created successfully',
      });
      (require('../../src/services/enrollment') as any).createEnrollment = mockCreateEnrollmentCtrl;
  
      const response = await request(app).post('/').send(enrollment);
  
      expect(response.status).toBe(200);
    
      expect(mockCreateEnrollmentCtrl).toHaveBeenCalled();
    });

    it('createEnrollmentCtrl should return an status 500 when an error occurs', async () => {
        const mockCreateEnrollmentCtrl = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/enrollment') as any).createEnrollment = mockCreateEnrollmentCtrl;
    
        const response = await request(app).post('/').send(enrollment);
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Error creating Enrollment');
        expect(mockCreateEnrollmentCtrl).toHaveBeenCalled();
      });
  });

    describe('test for updateEnrollmentCtrl  function', () => {
        const enrollment = {
        tournamentId: '1',
        userId: '1',
        league: 'Some League 1',
        club: 'Club 1',
        category: 'Category 1',
        practice_location: 'Location 1',
        }
    
        it('updateEnrollmentCtrl should return an enrollment when status 200', async () => {
        const mockUpdateEnrollmentCtrl = jest.fn().mockResolvedValue(enrollment);
        (require('../../src/services/enrollment') as any).updateEnrollment = mockUpdateEnrollmentCtrl;
    
        const response = await request(app).put('/1').send(enrollment);
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(enrollment);
        expect(mockUpdateEnrollmentCtrl).toHaveBeenCalled();
        });

        it('updateEnrollmentCtrl should return an status 500 when an error occurs', async () => {
            const mockUpdateEnrollmentCtrl = jest.fn().mockRejectedValue(new Error('error'));
            (require('../../src/services/enrollment') as any).updateEnrollment = mockUpdateEnrollmentCtrl;
        
            const response = await request(app).put('/1').send(enrollment);
        
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'error updating Enrollment');
            expect(mockUpdateEnrollmentCtrl).toHaveBeenCalled();
          });
    
    })
  
    describe('test for deleteEnrollmentCtrl  function', () => {
        const enrollment = {
        tournamentId: '1',
        userId: '1',
        league: 'Some League 1',
        club: 'Club 1',
        category: 'Category 1',
        practice_location: 'Location 1',
        }
    
        it('deleteEnrollmentCtrl should return an enrollment when status 200', async () => {
        const mockDeleteEnrollmentCtrl = jest.fn().mockResolvedValue(enrollment);
        (require('../../src/services/enrollment') as any).deleteEnrollment = mockDeleteEnrollmentCtrl;
    
        const response = await request(app).delete('/1').send(enrollment);
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(enrollment);
        expect(mockDeleteEnrollmentCtrl).toHaveBeenCalled();
        });

        it('deleteEnrollmentCtrl should return an status 500 when an error occurs', async () => {
            const mockDeleteEnrollmentCtrl = jest.fn().mockRejectedValue(new Error('error'));
            (require('../../src/services/enrollment') as any).deleteEnrollment = mockDeleteEnrollmentCtrl;
        
            const response = await request(app).delete('/1').send(enrollment);
        
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'error deleting Enrollment');
            expect(mockDeleteEnrollmentCtrl).toHaveBeenCalled();
          });
    
    })