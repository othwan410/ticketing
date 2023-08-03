import express from 'express';
import ShowController from '../controllers/show.controller';
import AuthMiddle from '../middlewares/auth';

const showController = new ShowController();
const authMiddle = new AuthMiddle();

const showRouter = express.Router();

showRouter.post(
  '/',
  authMiddle.isSignedIn,
  authMiddle.isAdmin,
  showController.createShow
);
showRouter.get('/', showController.findShow);
showRouter.get('/:showId', showController.findShowDetail);

export default showRouter;
