import {Router} from 'express';
import { getRegistrationsCtrl, getRegistrationCtrl, createRegistrationCtrl, updateRegistrationCtrl, deleteRegistrationCtrl, getRegistrationsUserCtrl } from '../controllers/registration';
// router for user registration to a tournament

const router = Router();

router.get("/", getRegistrationsUserCtrl)
router.get("/:id", getRegistrationCtrl)
router.post("/" , createRegistrationCtrl)
router.put("/:id" , updateRegistrationCtrl)
router.delete("/:id" , deleteRegistrationCtrl)

export default router;