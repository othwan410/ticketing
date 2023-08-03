import ReservationRepository from '../repositories/reservation.repository';
import { sequelize } from '../models';
import { Transaction } from 'sequelize';
const reservationRepository = new ReservationRepository();

class ReservationService {
  createReservation = async (
    userId: number,
    numShowId: number,
    numSeatId: number
  ) => {
    try {
      const findShowData = await reservationRepository.findShow(numShowId);

      console.log(findShowData);
      if (!findShowData) {
        return {
          status: 400,
          message: 'Service Error: 공연 정보가 존재하지 않습니다.',
        };
      }
      const findSeatData = await reservationRepository.findSeat(numSeatId);

      if (!findSeatData) {
        return {
          status: 400,
          message: 'Service Error: 좌석 정보가 존재하지 않습니다.',
        };
      }

      const findUserPointData = await reservationRepository.findUserPoint(
        userId
      );

      if (!findUserPointData) {
        return {
          status: 400,
          message: 'Service Error: 유저 정보가 없습니다.',
        };
      }

      const afterPoint = findUserPointData.point - findSeatData.price;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });
      try {
        const updateUserPointData = await reservationRepository.updateUserPoint(
          userId,
          afterPoint,
          t
        );

        console.log(updateUserPointData);
        if (!updateUserPointData) {
          return {
            status: 400,
            message: 'Service Error: 유저의 포인트가 부족합니다.',
          };
        }

        await reservationRepository.createReservation(userId, numSeatId, t);

        await t.commit();

        return { status: 200, message: '공연 예약이 완료되었습니다.' };
      } catch (error) {
        await t.rollback();
        return {
          status: 400,
          message: 'Transaction Error: 공연 예약에 실패했습니다.',
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: 'Repository Error: 공연 예약에 실패 했습니다.',
      };
    }
  };

  deleteReservation = async (userId: number, numReservationId: number) => {
    try {
      const findReservationData = await reservationRepository.findReservation(
        numReservationId
      );

      if (!findReservationData) {
        return {
          status: 400,
          message: 'Service Error: 예약 정보가 존재하지 않습니다.',
        };
      }

      const reservationUserId: number = findReservationData.userId;
      if (reservationUserId !== userId) {
        return {
          status: 400,
          message: 'Service Error: 예약 취소에 대한 권한이 없습니다.',
        };
      }
      // const price = findReservationData.Seat.price
      const reservationSeatId: number = findReservationData.seatId;

      const findSeatData = await reservationRepository.findSeat(
        reservationSeatId
      );

      if (!findSeatData) {
        return {
          status: 400,
          message: 'Service Error: 좌석 정보가 존재하지 않습니다.',
        };
      }

      const findUserPointData = await reservationRepository.findUserPoint(
        userId
      );

      if (!findUserPointData) {
        return {
          status: 400,
          message: 'Service Error: 유저 정보가 없습니다.',
        };
      }

      const beforePoint: number = findUserPointData.point + findSeatData.price;

      const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });
      try {
        await reservationRepository.updateUserPoint(userId, beforePoint, t);

        await reservationRepository.deleteReservation(numReservationId, t);

        await t.commit();

        return { status: 200, message: '예약 취소가 완료되었습니다.' };
      } catch (error) {
        await t.rollback();
        return {
          status: 400,
          message: 'Transaction Error: 예약 취소가 실패했습니다.',
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: 'Repository Error: 예약 취소가 실패했습니다.',
      };
    }
  };
}

export default ReservationService;
