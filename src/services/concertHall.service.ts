import ConcertHallRepository from '../repositories/concertHall.repository';

const concertHallRepository = new ConcertHallRepository();

export type seats = {
  showId: number;
  seatNumber: number;
  grade: string;
  price: number;
  isReservation: boolean;
};

class ShowService {
  declare status: number;
  declare message: string;

  createConcertHall = async (name: string, address: string) => {
    try {
      await concertHallRepository.createConcertHall(name, address);

      return { status: 200, message: '공연 등록이 완료되었습니다.' };
    } catch (error) {
      return {
        status: 400,
        message: 'Transaction Error: 공연 등록에 실패했습니다.',
      };
    }
  };
}

export default ShowService;
