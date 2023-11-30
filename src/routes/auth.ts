import {  Router } from 'express';
import { registerNewUserCtrl, loginUserCtrl, renewTokenCtrl} from '../controllers/auth';
import passport from 'passport';

import 'dotenv/config';

const GOOGLE_CLIENT_URL = <string>process.env.GOOGLE_CLIENT_URL;

const router = Router();

router.post("/register", registerNewUserCtrl)
router.post("/login", loginUserCtrl)
router.get("/renew", renewTokenCtrl)

router.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }))

// router.get("/auth/google/callback", passport.authenticate('google', {
//     successRedirect: `${GOOGLE_CLIENT_URL}`,
//     failureRedirect: `${GOOGLE_CLIENT_URL}/auth/login`
//   }));
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: `${GOOGLE_CLIENT_URL}`,
      failureRedirect: `${GOOGLE_CLIENT_URL}/auth/login`,
    }),
    (req, res, next) => {
      console.log('req.user:', req.user);
      console.log('req.session:', req.session);
  
      // Ensure you call next() to proceed with the next middleware
      next();
    }
  );


export default router;