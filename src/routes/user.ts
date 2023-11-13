import {Router} from 'express';
import { getUserCtrl, getUsersCtrl, updateUserCtrl } from '../controllers/users';
import ROLES from '../config/roles_list';
import authRole from '../middleware/authRole';


const router = Router();

router.get("/", authRole(ROLES.ADMIN),  getUsersCtrl)
router.get("/:id", authRole(ROLES.ADMIN),  getUserCtrl)
router.put("/:id", authRole(ROLES.ADMIN), updateUserCtrl)


export default router;