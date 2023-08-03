import Show from '../models/shows';
import Seat from '../models/seats';
import User from '../models/users';
import Reservation from '../models/reservations';
import { Transaction } from 'sequelize';

class ReservationRepository {
  findShow = async (showId: number) => {
    const findShowData = await Show.findOne({
      attributes: ['showId'],
      where: { showId },
    });

    return findShowData;
  };

  findSeat = async (seatId: number) => {
    const findSeatData = await Seat.findOne({
      attributes: ['seatId', 'price'],
      where: { seatId },
    });

    return findSeatData;
  };

  findUserPoint = async (userId: number) => {
    const findUserPointData = await User.findOne({
      attributes: ['userId', 'point'],
      where: { userId },
    });

    return findUserPointData;
  };

  updateUserPoint = async (
    userId: number,
    afterPoint: number,
    t: Transaction
  ) => {
    const updateUserPointData = await User.update(
      { point: afterPoint },
      {
        where: { userId },
        transaction: t,
      }
    );

    return updateUserPointData;
  };

  createReservation = async (
    userId: number,
    seatId: number,
    t: Transaction
  ) => {
    const crateReservationData = await Reservation.create(
      { userId, seatId },
      { transaction: t }
    );

    return crateReservationData;
  };

  findReservation = async (reservationId: number) => {
    const findReservationData = await Reservation.findOne({
      attributes: ['reservationId', 'userId', 'seatId'],
      include: {
        model: Seat,
        attributes: ['price'],
      },
      where: { reservationId },
      raw: true,
      nest: true,
    });

    return findReservationData;
  };

  deleteReservation = async (reservationId: number, t: Transaction) => {
    const deleteReservationData = await Reservation.destroy({
      where: { reservationId },
      transaction: t,
    });
    return deleteReservationData;
  };
}

export default ReservationRepository;
