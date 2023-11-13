import {Router} from 'express';
import { getUserCtrl, getUsersCtrl, updateUserCtrl } from '../controllers/users';

const router = Router();

router.get("/", getUsersCtrl)
router.get("/:id", getUserCtrl)
router.put("/:id", updateUserCtrl)


export default router;