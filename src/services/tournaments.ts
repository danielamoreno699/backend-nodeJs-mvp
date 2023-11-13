import {Request, Response} from 'express';
import  tournamentModel from '../model/user';
import  {Tournament} from '../interface/tournament.interface';

// only for admin operations


const getTournaments = async()=> {  // admin can get list of users
 const responseGetTournaments = await tournamentModel.find({});
 return responseGetTournaments;

}


const getTournament = async(id: string)=> {  // admin can get list of users
    const responseGetTournament = await tournamentModel.findById({_id: id});
    return responseGetTournament;
    
    }

const createTournament = async(tournament: Tournament)=> {  // admin can create a tournament
    const responseCreateTournament = await tournamentModel.create(tournament);
    return responseCreateTournament;
    
    }



const updateTournament = async(id: string, data: Tournament) => { // admin can get access to tournament details and modify them
    const updateTournament = await tournamentModel.findByIdAndUpdate({_id: id}, data, {new: true});
    return updateTournament;
}

const deleteTournament = async(id: string) => { // admin can delete a tournament
    const deleteTournament = await tournamentModel.findByIdAndDelete({_id: id});
    return deleteTournament;
}

export {getTournaments, createTournament, updateTournament, deleteTournament, getTournament};
