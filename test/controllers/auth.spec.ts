
import request from 'supertest';
import express, { Application } from 'express';
import { registerNewUserCtrl, loginUserCtrl } from '../../src/controllers/auth';


jest.mock('../../src/services/auth', () => ({
  registerNewUser: jest.fn(),
  loginUser: jest.fn(),
}));

const app: Application = express();
app.use(express.json());
app.post('/register', registerNewUserCtrl);
app.post('/login', loginUserCtrl);

describe('Auth registerNewUserCtrl test', () => {
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

  it('should return an status 409 when the user already exists', async () => {
    const mockRegisterNewUser = jest.fn().mockRejectedValue(new Error('User already exists'));
    (require('../../src/services/auth') as any).registerNewUser = mockRegisterNewUser;

    const response = await request(app)
      .post('/register')
      .send(userTest);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message', 'User already exists');
    expect(mockRegisterNewUser).toHaveBeenCalledWith(userTest);
  });

  it('should return an status 500 when an error occurs', async () => {
    const mockRegisterNewUser = jest.fn().mockRejectedValue(new Error('error'));
    (require('../../src/services/auth') as any).registerNewUser = mockRegisterNewUser;

    const response = await request(app)
      .post('/register')
      .send(userTest);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Error creating user');
    expect(mockRegisterNewUser).toHaveBeenCalledWith(userTest);
  });

  
});

describe('Auth loginUserCtrl test', () => {
  const userTestLogin = {
    email: 'test@gmail.com',
    password: 'test123',
    };

    it('function loginUserCtrl should logged a user when all fields are correct', async () => {
    const mockLoginUser = jest.fn().mockResolvedValue('mockUserId');
    (require('../../src/services/auth') as any).loginUser = mockLoginUser;

    const response = await request(app)
      .post('/login')
      .send(userTestLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User logged in successfully');
    expect(response.body).toHaveProperty('data', 'mockUserId');
    expect(mockLoginUser).toHaveBeenCalledWith(userTestLogin);
    })

    it('should return an status 401 when the password does not match', async () => {
      const mockLoginUser = jest.fn().mockResolvedValue('Password does not match');
      (require('../../src/services/auth') as any).loginUser = mockLoginUser;
  
      const response = await request(app)
        .post('/login')
        .send(userTestLogin);
  
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Authentication failed');
      expect(response.body).toHaveProperty('error', 'Password does not match');
      expect(mockLoginUser).toHaveBeenCalledWith(userTestLogin);
    });

    it('should return an status 500 when an error occurs', async () => {
        const mockLoginUser = jest.fn().mockRejectedValue(new Error('error'));
        (require('../../src/services/auth') as any).loginUser = mockLoginUser;
    
        const response = await request(app)
            .post('/login')
            .send(userTestLogin);
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Error during authentication');
        expect(mockLoginUser).toHaveBeenCalledWith(userTestLogin);
        })


  
});
