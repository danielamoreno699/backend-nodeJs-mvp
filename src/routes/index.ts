import { Router } from 'express';
import enrollementRouter from './enrollments';
import authRoutes from './auth';
import tournamentRoutes from './tournament';
import userRoutes from './user';
import { checkJwt } from '../middleware/session';
import { persistanceLoginCtrl } from '../controllers/auth';

const router = Router();

router.use("/enrollments", checkJwt, enrollementRouter);
router.use('/', authRoutes);
router.get("/session/:id", persistanceLoginCtrl, checkJwt);
router.use('/tournaments',checkJwt,tournamentRoutes);
router.use('/users',checkJwt, userRoutes);



export default router;