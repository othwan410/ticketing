import ConcertHall from '../models/concertHalls';
import { Transaction } from 'sequelize';

class ConcertHallRepository {
  createConcertHall = async (name: string, address: string) => {
    const createConcertHallData = await ConcertHall.create({
      name,
      address,
    });

    return createConcertHallData;
  };
}

export default ConcertHallRepository;
