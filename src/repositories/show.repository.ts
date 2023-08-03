import Show from '../models/shows';
import Seat, { seats } from '../models/seats';
import ConcertHall from '../models/concertHalls';
import { Transaction } from 'sequelize';
import { sequelize } from '../models';

class ShowRepository {
  createShow = async (
    concertHallId: number,
    title: string,
    description: string,
    showTime: string,
    t: Transaction
  ) => {
    const createShowData = await Show.create(
      {
        concertHallId,
        title,
        description,
        showTime,
      },
      { transaction: t }
    );

    return createShowData;
  };

  createSeats = async (seatsArr: Array<seats>, t: Transaction) => {
    const createSeats = await Seat.bulkCreate(seatsArr, { transaction: t });

    return createSeats;
  };

  findShowAll = async () => {
    const getShowData = await Show.findAll({
      attributes: ['showId', 'userId', 'title', 'description', 'showTime'],
    });

    return getShowData;
  };

  findShow = async (title: string) => {
    const getShowData = await Show.findAll({
      attributes: ['showId', 'userId', 'title', 'description', 'showTime'],
      include: {
        model: ConcertHall,
        attributes: ['name', 'address'],
      },
      where: { title },
    });
    return getShowData;
  };

  findShowDetail = async (showId: number) => {
    const getShowDetailData = await Show.findAll({
      attributes: ['showId', 'userId', 'title', 'description', 'showTime'],
      where: sequelize.literal(
        `Shows.seatId NOT IN (SELECT seatId FROM Reservations WHERE Reservations.showId = ${showId}`
      ),
    });
    return getShowDetailData;
  };
}

export default ShowRepository;
