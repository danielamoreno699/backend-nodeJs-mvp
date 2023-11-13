import { Router } from 'express';
import { getTournamentsCtrl, getTournamentCtrl, createTournamentCtrl, updateTournamentCtrl, deleteTournamentCtrl } from '../controllers/tournaments';
import ROLES from '../config/roles_list';
import authRole from '../middleware/authRole';

const router = Router();

router
  .get("/", authRole(ROLES.ADMIN), getTournamentsCtrl)
  .get("/:id", authRole(ROLES.ADMIN), getTournamentCtrl)
  .post("/", authRole(ROLES.ADMIN), createTournamentCtrl)
  .put("/:id", authRole(ROLES.ADMIN), updateTournamentCtrl)
  .delete("/:id", authRole(ROLES.ADMIN), deleteTournamentCtrl);

export default router;
