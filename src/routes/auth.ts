import {  Router } from 'express';
import { registerNewUserCtrl, loginUserCtrl, renewTokenCtrl} from '../controllers/auth';
import passport from 'passport';

import 'dotenv/config';

const GOOGLE_CLIENT_URL = <string>process.env.GOOGLE_CLIENT_URL;

const router = Router();

router.post("/register", registerNewUserCtrl)
router.post("/login", loginUserCtrl)
router.get("/renew", renewTokenCtrl)

router.post("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get("/auth/google/callback", passport.authenticate('google', {
    failureRedirect: `${GOOGLE_CLIENT_URL}/auth/login`
  }), (req, res) => {

    res.redirect(GOOGLE_CLIENT_URL);
  });
  

export default router;