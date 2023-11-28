import {Router} from 'express';
import { getEnrollmentsAdminCtrl, getEnrollmentsUserCtrl, getEnrollmentCtrl, updateEnrollmentCtrl, deleteEnrollmentCtrl, createEnrollmentCtrl } from '../controllers/enrollments';
import { authRole } from '../middleware/session';
import ROLES from '../config/roles_list';
// router for user registration to a tournament

const router = Router();

router.get("/:id/user-details", authRole(ROLES.USER),  getEnrollmentsUserCtrl)
router.get("/users", authRole(ROLES.ADMIN),  getEnrollmentsAdminCtrl)
router.get("/:id", getEnrollmentCtrl)
router.post("/" , createEnrollmentCtrl)
router.put("/:id" , updateEnrollmentCtrl)
router.delete("/:id" , deleteEnrollmentCtrl)

export default router;