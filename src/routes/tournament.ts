import { Router } from 'express';
import { getTournamentsCtrl, getTournamentCtrl, createTournamentCtrl, updateTournamentCtrl, deleteTournamentCtrl } from '../controllers/tournaments';
import ROLES from '../config/roles_list';
import { authRole } from '../middleware/session';



const router = Router();

router
  .get("/", getTournamentsCtrl)
  .get("/:id", getTournamentCtrl)
  .post("/", authRole(ROLES.ADMIN), createTournamentCtrl)
  .put("/:id", authRole(ROLES.ADMIN), updateTournamentCtrl)
  .delete("/:id", authRole(ROLES.ADMIN), deleteTournamentCtrl);

export default router;
