import request from 'supertest';
import express, { Application } from 'express';
import { getUsersCtrl, updateUserCtrl, getUserCtrl } from '../../src/controllers/users';


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

describe('User controller test for getUsersCtrl  function', () => {
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

  it('getUsersCtrl should return an array of users when status 200', async () => {
    
    const mockGetUsers = jest.fn().mockResolvedValue([users[0], users[1]]);
    (require('../../src/services/user') as any).getUsers = mockGetUsers;


    const response = await request(app).get('/users');

 
    expect(response.status).toBe(200);
    expect(response.body).toEqual([users[0], users[1]]);

  
    expect(mockGetUsers).toHaveBeenCalled();
  });

  it('getUsersCtrl should return an status 500 when an error occurs', async () => {
    const mockGetUsers = jest.fn().mockRejectedValue(new Error('error'));
    (require('../../src/services/user') as any).getUsers = mockGetUsers;

    const response = await request(app).get('/users');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'error getting users');
    expect(mockGetUsers).toHaveBeenCalled();
  });


});

describe('User controller test for getUserCtrl  function', () => {
  const user = {
    name: 'test1',
    last_name: 'test1',
    email: 'test1@email.com',
    role: 'user',
  }
  
  it('getUserCtrl should return an user when status 200', async () => {
    const mockGetUser = jest.fn().mockResolvedValue(user);
    (require('../../src/services/user') as any).getUser = mockGetUser;

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
    expect(mockGetUser).toHaveBeenCalledWith('1');
  }); 
});
