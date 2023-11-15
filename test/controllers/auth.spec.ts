import request from 'supertest'
import express, { Application } from 'express';
import { registerNewUserCtrl, loginUserCtrl } from '../../src/controllers/auth'

jest.mock('../src/services/auth', () => ({
    registerNewUser: jest.fn(),
    loginUser: jest.fn(),
  }));