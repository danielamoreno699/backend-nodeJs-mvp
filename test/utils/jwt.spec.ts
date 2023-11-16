import { createToken, verifyToken } from '../../src/utils/jwt.handle';

import jwt from 'jsonwebtoken';
jest.mock('jsonwebtoken');


describe('createToken function', () => {
    it('should create a valid token', () => {
    const payload = {
        _id: 'user123',
        email: 'user@example.com',
        role: 'USER',
    };


    (jwt.sign as jest.Mock).mockReturnValueOnce('mocked-token');

    const token = createToken(payload);

  
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    });
  });
  
