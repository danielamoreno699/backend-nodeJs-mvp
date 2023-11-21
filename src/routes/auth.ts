import {  Router } from 'express';
import { registerNewUserCtrl, loginUserCtrl, renewTokenCtrl, persistanceLoginCtrl } from '../controllers/auth';



const router = Router();

router.post("/register", registerNewUserCtrl)
router.post("/login", loginUserCtrl)
router.get("/renew", renewTokenCtrl)


export default router;