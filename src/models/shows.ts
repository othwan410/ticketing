'use strict';
import Sequelize, {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import ConcertHall from './concertHalls';
import Seat from './seats';

class Show extends Model<InferAttributes<Show>, InferCreationAttributes<Show>> {
  declare showId: CreationOptional<number>;
  declare concertHallId: number;
  declare title: string;
  declare description: string;
  declare showTime: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Show.init(
      {
        showId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        concertHallId: {
          type: DataTypes.INTEGER,
        },
        title: {
          allowNull: false,
          type: DataTypes.STRING(20),
          unique: true,
        },
        description: {
          allowNull: false,
          type: DataTypes.STRING(100),
        },
        showTime: {
          allowNull: false,
          type: DataTypes.STRING(20),
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Shows',
        tableName: 'Shows',
        sequelize,
      }
    );
  }
  static associate() {
    this.belongsTo(ConcertHall, {
      foreignKey: 'concertHallId',
      targetKey: 'concertHallId',
    });
    this.hasMany(Seat, { foreignKey: 'showId', sourceKey: 'showId' });
  }
}

export default Show;
