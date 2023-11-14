import { Router } from 'express';
import registrationRouter from './registration';
import authRoutes from './auth';
import tournamentRoutes from './tournament';
import userRoutes from './user';
import { checkJwt } from '../middleware/session';

const router = Router();

router.use("/registrations", checkJwt, registrationRouter);
router.use('/', authRoutes);
router.use('/tournaments',checkJwt,tournamentRoutes);
router.use('/users',checkJwt, userRoutes);

export default router;