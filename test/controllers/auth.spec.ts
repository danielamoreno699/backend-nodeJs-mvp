
import request from 'supertest';
import express, { Application } from 'express';
import { registerNewUserCtrl, loginUserCtrl } from '../../src/controllers/auth';


jest.mock('../../src/services/auth', () => ({
  registerNewUser: jest.fn(),
}));

const app: Application = express();
app.use(express.json());
app.post('/register', registerNewUserCtrl);

describe('Auth controller test', () => {
  const userTest = {
    name: 'test',
    last_name: 'test',
    email: 'test@gmail.com',
    password: 'test123',
  };

  it('should create a new user when all fields are sent by the user', async () => {
  
    const mockRegisterNewUser = jest.fn().mockResolvedValue('mockUserId');
    (require('../../src/services/auth') as any).registerNewUser = mockRegisterNewUser;

  
    const response = await request(app)
      .post('/register')
      .send(userTest);

 
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'user created successfully');
    expect(response.body).toHaveProperty('data', 'mockUserId'); 


    expect(mockRegisterNewUser).toHaveBeenCalledWith(userTest);
  });

  
});
