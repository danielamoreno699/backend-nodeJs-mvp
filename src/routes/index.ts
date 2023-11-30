import { Router } from 'express';
import enrollementRouter from './enrollments';
import authRoutes from './auth';
import tournamentRoutes from './tournament';
import userRoutes from './user';
import { checkJwt } from '../middleware/session';
import { persistanceLoginCtrl } from '../controllers/auth';
import { customAuth } from '../utils/passport.handle';
import 'dotenv/config';



const router = Router();


const GOOGLE_CLIENT_URL = <string>process.env.GOOGLE_CLIENT_URL;

router.use("/enrollments", checkJwt, enrollementRouter);
router.use('/', authRoutes);
router.get("/session/:id", persistanceLoginCtrl, checkJwt);
router.use('/tournaments',checkJwt,tournamentRoutes);
router.use('/users',checkJwt, userRoutes);

//google auth

router.use("/auth/google", customAuth.authenticate('google', { scope: ['profile', 'email'] }))

router.use("/auth/google/callback", customAuth.authenticate('google', {
    successRedirect: `${GOOGLE_CLIENT_URL}`,
    failureRedirect: `${GOOGLE_CLIENT_URL}/auth/login`
  }));
  

export default router;