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
                description: 'test1',
                date: '2021-10-10',
                time: '10:00',
                price: 100,
                image: 'test1',
                capacity: 10,
                enrolled: 0,
                status: 'active',
                user_id: 1,
            },
            {
                name: 'test2',
                description: 'test2',
                date: '2021-10-10',
                time: '10:00',
                price: 100,
                image: 'test2',
                capacity: 10,
                enrolled: 0,
                status: 'active',
                user_id: 1,
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


