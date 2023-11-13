import { Router } from 'express';
import registrationRouter from './registration';
import authRoutes from './auth';
import tournamentRoutes from './tournament';
import userRoutes from './user';

const router = Router();

router.use("/registration", registrationRouter);
router.use('/auth', authRoutes);
router.use('/tournament', tournamentRoutes);
router.use('/user', userRoutes);

export default router;