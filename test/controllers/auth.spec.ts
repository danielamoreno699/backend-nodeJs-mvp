import request from 'supertest'
import express, { Application } from 'express';
import { registerNewUserCtrl, loginUserCtrl } from '../../src/controllers/auth'

const app = express()
app.use(express.json());
app.post('/register', registerNewUserCtrl);

describe('Auth controller test', () => {

    const userTest = {
        name: "test",
        last_name: "test",
        email: "test@gmail.com",
        password: "test123"
    }

    it('should create a new user when all fields are send by user', async () => {
        const response = await request(app)
            .post('/register')
            .send(userTest);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'user created successfully');
    });
    })
