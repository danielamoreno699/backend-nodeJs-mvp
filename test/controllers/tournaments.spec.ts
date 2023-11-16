import request from 'supertest';
import { mockRequest } from 'jest-mock-req-res';
import express, { Application } from 'express';
import { getTournamentsCtrl, updateTournamentCtrl, getTournamentCtrl, createTournamentCtrl, deleteTournamentCtrl} from '../../src/controllers/tournaments';

