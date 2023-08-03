import Sequelize from 'sequelize';
import { development } from '../config/config';
import User from './users';
import Show from './shows';
import Seat from './seats';
import Reservation from './reservations';
import ConcertHall from './concertHalls';

export const sequelize = new Sequelize.Sequelize(
  development.database,
  development.username,
  development.password,
  development
);
User.initiate(sequelize);
Reservation.initiate(sequelize);
Show.initiate(sequelize);
ConcertHall.initiate(sequelize);
Seat.initiate(sequelize);

User.associate();
Reservation.associate();
Show.associate();
ConcertHall.associate();
Seat.associate();

export { User, Reservation, ConcertHall, Seat, Show };
