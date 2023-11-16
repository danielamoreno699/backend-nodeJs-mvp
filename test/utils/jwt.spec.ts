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
  
  describe('verifyToken function', () => {
    it('should verify a valid token', () => {
    const validToken = 'valid-token';


    (jwt.verify as jest.Mock).mockReturnValueOnce({
        _id: 'user123',
        email: 'user@example.com',
        role: 'USER',
    });

    const decoded = verifyToken(validToken);
  
   
      expect(decoded).toEqual({
        _id: 'user123',
        email: 'user@example.com',
        role: 'USER',
      });
     
    });

    it('should throw an error for an invalid token', () => {
        const invalidToken = 'invalid-token';

     
        (jwt.verify as jest.Mock).mockImplementationOnce(() => {
            throw new Error('Invalid token');
        });

      
        expect(() => verifyToken(invalidToken)).toThrowError('Error verifying token');
    });
})