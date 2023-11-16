import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../src/utils/jwt.handle';
import { checkJwt, authRole} from '../../src/middleware/session';

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
        expect(next).toHaveBeenCalled();
    });
})