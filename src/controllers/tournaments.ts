import {Request, Response} from 'express';
import { handleHttp } from '../utils/error.hanlde';
import { getTournaments, updateTournament, getTournament, createTournament, deleteTournament } from '../services/tournaments';

const getTournamentsCtrl = async(req: Request, res: Response) => {

    try {
       const responseGetTournaments = await getTournaments();
       res.send(responseGetTournaments);
    } catch (error) {
        handleHttp(res, 'error getting tournaments');
    }

}

const getTournamentCtrl = async({params}: Request, res: Response) => {

    try {
       const {id} = params;
        const responseGetTournament = await getTournament(id);
        const data = responseGetTournament ? responseGetTournament : 'tournament not found';
       res.send(data);
    } catch (error) {
        handleHttp(res, 'error getting tournament');
    }

}

const createTournamentCtrl = async({body}: Request, res: Response) => {

    try {
        const responseCreateTournament = await createTournament(body);
        res.status(201).json({
            message: 'Tournament created successfully',
            data: responseCreateTournament,
        });
    } catch (error) {
        handleHttp(res, 'error creating tournament');
    }

}

const updateTournamentCtrl = async ({params,body}: Request, res: Response) => {
    try {
        const {id} = params;
        const responseUpdateTournament = await updateTournament(id, body);
        res.send(responseUpdateTournament);
    } catch (error) {
        console.log(error);
        handleHttp(res, 'error update item')
    }
    
};


const deleteTournamentCtrl = async({params}: Request, res: Response) => {
        
            try {
            const {id} = params;
            const responseDeleteTournament = await deleteTournament(id);
            res.send(responseDeleteTournament);
            } catch (error) {
                handleHttp(res, 'error deleting tournament');
            }
        
        }

export {getTournamentsCtrl, updateTournamentCtrl, getTournamentCtrl, createTournamentCtrl, deleteTournamentCtrl};