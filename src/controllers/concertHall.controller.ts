import { Request, Response, NextFunction } from 'express';
import concertHallService from '../services/concertHall.service';
import dotenv from 'dotenv';
dotenv.config();
const showService = new concertHallService();

class ShowController {
  createConcertHall = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    interface concertHallInterface {
      name: string;
      address: string;
    }
    try {
      const { name, address }: concertHallInterface = req.body;

      const createConcertHallData = await showService.createConcertHall(
        name,
        address
      );
      return res
        .status(createConcertHallData.status)
        .json({ result: createConcertHallData.message });
    } catch (error) {
      return res
        .status(400)
        .json({ result: 'Controller Error: 공연장 등록에 실패했습니다.' });
    }
  };
}

export default ShowController;
