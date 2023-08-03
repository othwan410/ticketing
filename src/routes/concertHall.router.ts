import express from 'express';
import ConcertHallController from '../controllers/concertHall.controller';
import AuthMiddle from '../middlewares/auth';

const concertHallController = new ConcertHallController();
const authMiddle = new AuthMiddle();

const concertHallRouter = express.Router();

concertHallRouter.post(
  '/concertHall',
  authMiddle.isSignedIn,
  authMiddle.isAdmin,
  concertHallController.createConcertHall
);

export default concertHallRouter;
