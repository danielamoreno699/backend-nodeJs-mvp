import request from 'supertest';
import { mockRequest } from 'jest-mock-req-res';
import express, { Application } from 'express';
import { getTournamentsCtrl, updateTournamentCtrl, getTournamentCtrl, createTournamentCtrl, deleteTournamentCtrl} from '../../src/controllers/tournaments';
import ROLES from '../../src/config/roles_list';
import { authRole } from '../../src/middleware/session';

jest.mock('../../src/services/tournaments', () => ({
    getTournaments: jest.fn(),
    getTournament: jest.fn(),
    deleteTournament: jest.fn(),
    createTournament: jest.fn(),
    updateTournament: jest.fn(),
  }));

  jest.mock('../../src/middleware/session', () => ({
    authRole: (role: string) => (req: any, res: any, next: any) => {
      req.user = { role: 'ADMIN' };
      next();
    },
  }));
  
  
  const app: Application = express();
  app.use(express.json());
  
  app
    .get('/', getTournamentsCtrl)
    .get('/:id', getTournamentCtrl)
    .post('/', authRole(ROLES.ADMIN), createTournamentCtrl)
    .put('/:id', authRole(ROLES.ADMIN), updateTournamentCtrl)
    .delete('/:id', authRole(ROLES.ADMIN), deleteTournamentCtrl);

describe(' test for getTournamentsCtrl  function', () => {
    it('getTournamentsCtrl should return an array of tournaments when status 200', async () => {

        const tournaments = [
            {
              name: 'test1',
              location: 'Test Location 1',
              city: 'Test City 1',
              desc: 'test1',
              img: 'test1',
              country: 'Test Country 1',
              date: '2023-10-10',
              capacity_available: 10,
            },
            {
              name: 'test2',
              location: 'Test Location 2',
              city: 'Test City 2',
              desc: 'test2',
              img: 'test2',
              country: 'Test Country 2',
              date: '2023-10-10',
              capacity_available: 10,
            },
          ];

        const mockGetTournaments = jest.fn().mockResolvedValue([tournaments[0], tournaments[1]]);
        (require('../../src/services/tournaments') as any).getTournaments = mockGetTournaments;

        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([tournaments[0], tournaments[1]]);

        expect(mockGetTournaments).toHaveBeenCalled();
    })

    it('getTournamentsCtrl should return an status 500 when an error occurs', async () => {
        const mockGetTournaments = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/tournaments') as any).getTournaments = mockGetTournaments;

        const response = await request(app).get('/');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'error getting tournaments');
        expect(mockGetTournaments).toHaveBeenCalled();
    })
})


describe('test for getTournamentCtrl  function', () => {
    const tournament = {
        name: 'test1',
        description: 'test1',
        date: '2021-10-10',
        time: '10:00',
        price: 100,
        image: 'test1',
        capacity: 10,
        enrolled: 0,
        status: 'active',
        user_id: 1,
    }

    it('getTournamentCtrl should return an tournament when status 200', async () => {
        const mockGetTournament = jest.fn().mockResolvedValue(tournament);
        (require('../../src/services/tournaments') as any).getTournament = mockGetTournament;

        const response = await request(app).get('/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(tournament);

        expect(mockGetTournament).toHaveBeenCalled();
    })

    it('getTournamentCtrl should return an status 500 when an error occurs', async () => {
        const mockGetTournament = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/tournaments') as any).getTournament = mockGetTournament;

        const response = await request(app).get('/1');

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'error getting tournament');
        expect(mockGetTournament).toHaveBeenCalled();
    })

})

describe('test for createTournamentCtrl  function for admin role', () => {
    const tournament = {
        name: 'test1',
        description: 'test1',
        date: '2021-10-10',
        time: '10:00',
        price: 100,
        image: 'test1',
        capacity: 10,
        enrolled: 0,
        status: 'active',
        user_id: 1,
    }

    it('createTournamentCtrl should return an tournament when status 201', async () => {
        const mockCreateTournament = jest.fn().mockResolvedValue(tournament);
        (require('../../src/services/tournaments') as any).createTournament = mockCreateTournament;

        const response = await request(app).post('/').send(tournament);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Tournament created successfully');
        expect(response.body).toHaveProperty('data', tournament);

        expect(mockCreateTournament).toHaveBeenCalledWith(tournament);
    })

    it('createTournamentCtrl should return an status 500 when an error occurs', async () => {
        const mockCreateTournament = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/tournaments') as any).createTournament = mockCreateTournament;

        const response = await request(app).post('/').send(tournament);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'error creating tournament');
        expect(mockCreateTournament).toHaveBeenCalledWith(tournament);
    })

})

describe('test for updateTournamentCtrl  function for admin role', () => {
    const tournament = {
        name: 'test1',
        city: 'test1',
        desc: 'test1',
        img: 'test1',
        country: 'test1',
        date: '2021-10-10',
        capacity_available: 10
    }

    it('updateTournamentCtrl should return an tournament when status 200', async () => {
        const mockUpdateTournament = jest.fn().mockResolvedValue(tournament);
        (require('../../src/services/tournaments') as any).updateTournament = mockUpdateTournament;

        const response = await request(app).put('/1').send(tournament);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(tournament);

        expect(mockUpdateTournament).toHaveBeenCalledWith('1', tournament);
    })

    it('updateTournamentCtrl should return an status 500 when an error occurs', async () => {
        const mockUpdateTournament = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/tournaments') as any).updateTournament = mockUpdateTournament;

        const response = await request(app).put('/1').send(tournament);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'error update item');
        expect(mockUpdateTournament).toHaveBeenCalledWith('1', tournament);
    })

})

describe('test for deleteTournamentCtrl  function for admin role', () => {
    const tournament = {
        name: 'test1',
        city: 'test1',
        desc: 'test1',
        img: 'test1',
        country: 'test1',
        date: '2021-10-10',
        capacity_available: 10
    }

    it('deleteTournamentCtrl should return an tournament when status 200', async () => {
        const mockDeleteTournament = jest.fn().mockResolvedValue(tournament);
        (require('../../src/services/tournaments') as any).deleteTournament = mockDeleteTournament;

        const response = await request(app).delete('/1').send(tournament);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(tournament);

        expect(mockDeleteTournament).toHaveBeenCalledWith('1');
    })

    it('deleteTournamentCtrl should return an status 500 when an error occurs', async () => {
        const mockDeleteTournament = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/tournaments') as any).deleteTournament = mockDeleteTournament;

        const response = await request(app).delete('/1').send(tournament);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'error deleting tournament');
        expect(mockDeleteTournament).toHaveBeenCalledWith('1');
    })

})


