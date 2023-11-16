import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../src/utils/jwt.handle';
import { checkJwt, authRole, RequestExt} from '../../src/middleware/session';

jest.mock('../../src/utils/jwt.handle');


describe('checkJwt middleware', () => {
    it('should set user in request if token is valid', () => {
      const req = {
        headers: { authorization: 'Bearer valid-token' },
      } as any;
      const res = {} as Response;
      const next: NextFunction = jest.fn();
  
      (verifyToken as jest.Mock).mockReturnValueOnce({ _id: '1', email: 'user@example.com', role: 'USER' });
  
      checkJwt(req, res, next);
  
      expect(req.user).toEqual({ _id: '1', email: 'user@example.com', role: 'USER' });
    
    });

    it('should return 401 if token is invalid', () => {
        const req: RequestExt = {
          headers: { authorization: 'Bearer invalid-token' },
        } as any;
        const res = {
          status: jest.fn(() => res),
          send: jest.fn(),
        } as any;
        const next: NextFunction = jest.fn();
    
        (verifyToken as jest.Mock).mockReturnValueOnce(null);
    
        checkJwt(req, res, next);
    
        expect(req.user).toBeUndefined();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: 'you are not authorized' });
        
      });

      it('should return 401 if authorization header is not provided', () => {
        const req: RequestExt = {
          headers: {},
        } as any;
        const res = {
          status: jest.fn(() => res),
          send: jest.fn(),
        } as any;
        const next: NextFunction = jest.fn();
    
        checkJwt(req, res, next);
    
        expect(req.user).toBeUndefined();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: 'you are not authorized' });
       
      });
    
})


describe('authRole middleware', () => {
    it('should call next if user has the required role', () => {
      const req: RequestExt = {
        user: { _id: '1', email: 'user@example.com', role: 'ADMIN' },
      } as any;
      const res = {} as Response;
      const next: NextFunction = jest.fn();
  
      authRole('ADMIN')(req, res, next);
  
      
    });
  
    it('should return 401 if user does not have the required role', () => {
      const req: RequestExt = {
        user: { _id: '1', email: 'user@example.com', role: 'USER' },
      } as any;
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      } as any;
      const next: NextFunction = jest.fn();
  
      authRole('ADMIN')(req, res, next);
  
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('You are not authorized as Admin');
     
    });
  });