import request from 'supertest';
import express, { Application } from 'express';
import { getUsersCtrl, updateUserCtrl, getUserCtrl } from '../../src/controllers/users';

// Mocking the users service for testing purposes
jest.mock('../../src/services/user', () => ({
  getUser: jest.fn(),
  getUsers: jest.fn(),
  updateUser: jest.fn(),
}));

const app: Application = express();
app.use(express.json());
app.get('/users', getUsersCtrl);
app.get('/users/:id', getUserCtrl);
app.put('/users/:id', updateUserCtrl);

describe('User controller test', () => {
  const users = [
    {
      name: 'test1',
      last_name: 'test1',
      email: 'test1@email.com',
      role: 'user',
    },
    {
      name: 'test2',
      last_name: 'test2',
      email: 'test2@email.com',
      role: 'user',
    },
  ];

  it('should return an array of users', async () => {
    
    const mockGetUsers = jest.fn().mockResolvedValue([users[0], users[1]]);
    (require('../../src/services/user') as any).getUsers = mockGetUsers;


    const response = await request(app).get('/users');

 
    expect(response.status).toBe(200);
    expect(response.body).toEqual([users[0], users[1]]);

  
    expect(mockGetUsers).toHaveBeenCalled();
  });


});
