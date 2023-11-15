import {Router} from 'express';
import { getRegistrationsCtrl, getRegistrationCtrl, createRegistrationCtrl, updateRegistrationCtrl, deleteRegistrationCtrl, getRegistrationsUserCtrl } from '../controllers/registration';
import { authRole } from '../middleware/session';
import ROLES from '../config/roles_list';
// router for user registration to a tournament

const router = Router();

router.get("/", authRole(ROLES.USER),  getRegistrationsUserCtrl)
router.get("/users", authRole(ROLES.ADMIN),  getRegistrationsCtrl)
router.get("/:id", getRegistrationCtrl)
router.post("/" , createRegistrationCtrl)
router.put("/:id" , updateRegistrationCtrl)
router.delete("/:id" , deleteRegistrationCtrl)

export default router;