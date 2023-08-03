import User from '../models/users';
import Reservation from '../models/reservations';
import Seat from '../models/seats';
import Show from '../models/shows';
import ConcertHall from '../models/concertHalls';

class UserRepository {
  getUserinfo = async (userId: number) => {
    const getUserinfoData = await User.findOne({
      attributes: ['userId', 'name', 'email', 'point', 'admin'],
      where: { userId },
    });

    return getUserinfoData;
  };

  getReservation = async (userId: number) => {
    const getReservationData = await Reservation.findAll({
      attributes: ['reservationId', 'userId', 'seatId'],
      include: [
        {
          model: Seat,
          attributes: ['showId', 'seatNumber', 'grade', 'price'],
          include: [
            {
              model: Show,
              attributes: ['title', 'showTime'],
            },
            {
              model: ConcertHall,
              attributes: ['name', 'address'],
            },
          ],
        },
      ],
      where: { userId },
    });

    return getReservationData;
  };
}

export default UserRepository;
