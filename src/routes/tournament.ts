import {Router} from 'express';
import { getTournamentsCtrl, getTournamentCtrl, createTournamentCtrl, updateTournamentCtrl, deleteTournamentCtrl } from '../controllers/tournaments';

const router = Router();

router.get("/" , getTournamentsCtrl)
router.get("/:id" , getTournamentCtrl)
router.post("/" , createTournamentCtrl)
router.put("/:id" , updateTournamentCtrl)
router.delete("/:id" , deleteTournamentCtrl)

export default router;