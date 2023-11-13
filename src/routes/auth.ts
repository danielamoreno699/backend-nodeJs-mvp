import {  Router } from 'express';
import { registerNewUserCtrl, loginUserCtrl } from '../controllers/auth';



const router = Router();

router.post("/register", registerNewUserCtrl)
router.post("/login", loginUserCtrl)


export default router;