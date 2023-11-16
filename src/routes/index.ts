import { Router } from 'express';
import enrollementRouter from './enrollments';
import authRoutes from './auth';
import tournamentRoutes from './tournament';
import userRoutes from './user';
import { checkJwt } from '../middleware/session';

const router = Router();

router.use("/enrollments", checkJwt, enrollementRouter);
router.use('/', authRoutes);
router.use('/tournaments',checkJwt,tournamentRoutes);
router.use('/users',checkJwt, userRoutes);

export default router;