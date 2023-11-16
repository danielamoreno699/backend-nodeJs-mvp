import request from 'supertest';
import { mockRequest } from 'jest-mock-req-res';
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

  it('getUserCtrl should return an status 500 when an error occurs', async () => {
    const mockGetUser = jest.fn().mockRejectedValue(new Error('error'));
    (require('../../src/services/user') as any).getUser = mockGetUser;

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'error getting user');
    expect(mockGetUser).toHaveBeenCalledWith('1');
  });

});

describe('test updateUserCtrl function', () => {
  const userId = '1';
  const req = mockRequest({
    params: { id: userId },
    body: { name: 'John', last_name: 'Doe' },
  });

  const updatedUser = { id: userId, name: 'John', last_name: 'Smith' };
  const mockUpdateUser = jest.fn().mockResolvedValue(updatedUser) as jest.Mock;

  it('updateUserCtrl should return the updated user when status 200', async () => {
    
    (require('../../src/services/user') as any).updateUser = mockUpdateUser;
  
    const response = await request(app)
      .put(`/users/${userId}`)
      .send({ name: 'John', last_name: 'Doe' }); 
  
    expect(response.status).toBe(200);
    expect(mockUpdateUser).toHaveBeenCalledWith(userId, { name: 'John', last_name: 'Doe' });
    expect(mockUpdateUser).toHaveBeenCalledTimes(1);

  });
  

  it('updateUserCtrl should return an status 500 when an error occurs', async () => {
    const mockUpdateUser = jest.fn().mockRejectedValue(new Error('error'));
    (require('../../src/services/user') as any).updateUser = mockUpdateUser;

    const response = await request(app).put(`/users/${userId}`).send(req.body);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'error updating user');
    expect(mockUpdateUser).toHaveBeenCalledWith(userId, req.body);
  });
});
